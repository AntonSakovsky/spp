import { Req, UseGuards } from '@nestjs/common';
import {
    MessageBody,
    OnGatewayConnection,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

import { AuthGuard } from 'src/auth/auth.guard';
import { RequestWithUserInfo } from 'src/auth/types/RequestWithUserInfo';
import { CommentCreateDto } from './dto/CommentCreateDto';
import { DeleteTodoDto } from './dto/DeleteTodoDto';
import { TodoCreateDto } from './dto/TodoCreateDto';
import { TodoUpdateDto } from './dto/TodoUpdateDto';
import { updateTodosOrderDto } from './dto/UpdateTodosOrderDto';
import { TodoService } from './todo.service';

@UseGuards(AuthGuard)
@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class TodoGateway implements OnGatewayConnection {
    wsClients = [];

    constructor(private todoService: TodoService) {}

    handleConnection(client: any) {
        this.wsClients.push(client);
    }


    @WebSocketServer()
    server: Server;

    @SubscribeMessage('getAllTodos')
    async getTodos(@Req() request: RequestWithUserInfo) {
        const todos = await this.todoService.getTodos(request.user.id);

        return todos.sort((a, b) => a.order - b.order);
    }

    @SubscribeMessage('createTodo')
    async createTodo(
        @Req() request: RequestWithUserInfo,
        @MessageBody() todoDto: TodoCreateDto,
    ) {
        const todo = await this.todoService.createTodo(
            request.user.id,
            todoDto,
        );
        this.server.emit('createTodo', todo);
    }

    @SubscribeMessage('deleteTodo')
    async deleteTodo(@MessageBody() todoDto: DeleteTodoDto) {
        this.server.emit(
            'deleteTodo',
            await this.todoService.deleteTodo(todoDto.todoId),
        );
    }

    @SubscribeMessage('createComment')
    async createComment(
        @Req() request: RequestWithUserInfo,
        @MessageBody() commentDto: CommentCreateDto,
    ) {
        this.server.emit(
            'createComment',
            await this.todoService.createTodoComment(
                commentDto,
                request.user.id,
            ),
        );
    }

    @SubscribeMessage('updateTodo')
    async updateTodo(@MessageBody() todoDto: TodoUpdateDto) {
        this.server.emit(
            'updateTodo',
            await this.todoService.updateTodo(todoDto),
        );
    }

    @SubscribeMessage('updateTodosOrder')
    async updateTodosOrder(@MessageBody() updateOrderDto: updateTodosOrderDto) {
        const todos = await this.todoService.updateTodosOrder(
            updateOrderDto.todos,
        );

        this.server.emit('updateTodosOrder', {
            boardName: updateOrderDto.boardName,
            todos,
        });
    }
}
