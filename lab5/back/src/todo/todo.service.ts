import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/entities/Comment';
import { Todo } from 'src/entities/Todo';
import { User } from 'src/entities/User';
import { Repository } from 'typeorm';
import { CommentCreateDto } from './dto/CommentCreateDto';
import { TodoCreateDto } from './dto/TodoCreateDto';
import { TodoDto } from './dto/TodoDto';
import { TodoUpdateDto } from './dto/TodoUpdateDto';
import { UpdateTodosOrderDto } from './dto/UpdateTodosOrderDto';
import { join } from 'path';
import { FileUpload } from 'graphql-upload-ts';
import { createWriteStream, writeFile } from 'fs';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(Todo) private todoRepository: Repository<Todo>,
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Comment)
        private commentRepository: Repository<Comment>,
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

    async getTodoById(todoId: number) {
        return await this.todoRepository.findOne({
            where: {
                id: todoId,
            },
            relations: ['comments'],
        });
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
        const { id } = await this.todoRepository.save(todo);

        return this.getTodoById(id);
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
        return await this.todoRepository.save(updatedTodo);
    }

    async updateTodosOrder(todos: UpdateTodosOrderDto[]) {
        try {
            for (const todo of todos) {
                await this.todoRepository.update(todo.id, {
                    order: todo.order,
                });
            }
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("Cannot update todos order");
        }
    }

    async uploadFile(
        fileData: string,
        filename: string,
        userId: number,
        todoId: number,
    ) {
        const dbUser = await this.userRepository.findOne({
            where: { id: userId },
        });
        const dbTodo = await this.todoRepository.findOne({
            where: { id: todoId },
        });

        if (!dbUser || !dbTodo) {
            throw new BadRequestException();
        }

        const buffer = Buffer.from(fileData, 'base64');

        const uploadPath = join(__dirname, '../../', 'uploads');

        writeFile(join(uploadPath, filename), buffer, () => {
            console.log('loaded');
        });
        

        const comment = new Comment();
        comment.filename = filename;
        comment.filepath = uploadPath;
        comment.todo = dbTodo;
        comment.user = dbUser;

        try {
            return await this.commentRepository.save(comment);
        } catch (error) {
            console.log(error);
        }
    }

    async createTodoComment(commentDto: CommentCreateDto, userId: number) {
        const dbUser = await this.userRepository.findOne({
            where: { id: userId },
        });
        const dbTodo = await this.todoRepository.findOne({
            where: { id: commentDto.todoId },
        });

        if (!dbUser || !dbTodo) {
            throw new BadRequestException();
        }

        const comment = new Comment();
        comment.message = commentDto.message;
        comment.todo = dbTodo;
        comment.user = dbUser;

        try {
            return await this.commentRepository.save(comment);
        } catch (error) {
            console.log(error);
        }
    }

    async deleteTodo(todoId: number) {
        await this.todoRepository.delete({ id: todoId });
    }
}
