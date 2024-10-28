import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AuthGuard } from 'src/auth/auth.guard';
import { RequestWithUserInfo } from 'src/auth/types/RequestWithUserInfo';
import { CommentModel } from 'src/models/comment.model';
import { TodoModel } from '../models/todo.model';
import { CommentCreateDto } from './dto/CommentCreateDto';
import { TodoCreateDto } from './dto/TodoCreateDto';
import { TodoUpdateDto } from './dto/TodoUpdateDto';
import { UpdateTodosOrderDto } from './dto/UpdateTodosOrderDto';
import { TodoService } from './todo.service';

@UseGuards(AuthGuard)
@Resolver()
export class TodoResolver {
    constructor(private todoService: TodoService) {}

    @Query(() => [TodoModel], { name: 'allTodos' })
    async getTodos(@Context() context: any) {
        const request: RequestWithUserInfo = context.req;
        const todos = await this.todoService.getTodos(request.user.id);

        return todos.sort((a, b) => a.order - b.order);
    }

    @Mutation(() => TodoModel, { name: 'createTodo' })
    async createTodo(
        @Context() context: any,
        @Args('todoDto') todoDto: TodoCreateDto,
    ) {
        const request: RequestWithUserInfo = context.req;
        const todo = await this.todoService.createTodo(
            request.user.id,
            todoDto,
        );
        return todo;
    }

    @Mutation(() => CommentModel, { name: 'createComment' })
    async createComment(
        @Args('commentDto') commentDto: CommentCreateDto,
        @Context() context: any,
    ) {
        const request: RequestWithUserInfo = context.req;
        const comment = await this.todoService.createTodoComment(
            commentDto,
            request.user.id,
        );
        return comment;
    }

    @Mutation(() => TodoModel, { name: 'updateTodo' })
    async updateTodo(@Args('todoDto') todoDto: TodoUpdateDto) {
        return await this.todoService.updateTodo(todoDto);
    }

    @Mutation(() => Boolean, { name: 'updateTodosOrder' })
    async updateTodosOrder(
        @Args('todosDto', { type: () => [UpdateTodosOrderDto] })
        todos: UpdateTodosOrderDto[],
    ) {
        await this.todoService.updateTodosOrder(todos);
        return true;
    }

    @Mutation(() => Boolean, { name: 'deleteTodo' })
    async deleteTodo(@Args('todoId', { type: () => Int }) todoId: number) {
        await this.todoService.deleteTodo(todoId);
        return true;
    }
}
