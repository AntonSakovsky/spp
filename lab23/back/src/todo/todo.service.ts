import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/entities/Todo';
import { User } from 'src/entities/User';
import { Repository } from 'typeorm';
import { TodoCreateDto } from './dto/TodoCreateDto';
import { TodoDto } from './dto/TodoDto';
import { TodoUpdateDto } from './dto/TodoUpdateDto';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(Todo) private todoRepository: Repository<Todo>,
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {}

    async getTodos(userId: number) {
        const todos = await this.todoRepository.find({
            where: {
                creator: {
                    id: userId,
                },
            },
            relations: ['comments', 'creator'],
        });

        return todos;
    }

    async createTodo(userId: number, todoDto: TodoCreateDto) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
        });

        if (!user) {
            throw new BadRequestException('User with this id not found');
        }

        const todo = Todo.fromCreateDto(todoDto);
        todo.creator = user;
        return await this.todoRepository.save(todo);
    }

    async updateTodo(todoDto: TodoUpdateDto) {
        const todo = await this.todoRepository.findOne({
            where: {
                id: todoDto.id,
            },
        });

        if (!todo) {
            throw new BadRequestException('Todo not found');
        }

        todoDto.deadline = todoDto.deadline
            ? new Date(todoDto.deadline)
            : undefined;
        const updatedTodo: TodoDto = Object.assign(todo, todoDto);
        await this.todoRepository.save(updatedTodo);

        return todoDto;
    }

    async updateTodosOrder(todos: TodoDto[]) {
        try {
            for (const todo of todos) {
                await this.todoRepository.update(todo.id, {
                    order: todo.order,
                });
            }
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("Can't update todos order");
        }
    }

    async deleteTodo(todoId: number) {
        await this.todoRepository.delete({ id: todoId });
    }
}
