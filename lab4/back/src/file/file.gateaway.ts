import { Req, UseGuards } from '@nestjs/common';
import {
    MessageBody,
    OnGatewayConnection,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Server } from 'socket.io';

import { AuthGuard } from 'src/auth/auth.guard';
import { RequestWithUserInfo } from 'src/auth/types/RequestWithUserInfo';
import { UploadTodoFileDto } from 'src/todo/dto/UploadTodoFileDto';
import { TodoService } from 'src/todo/todo.service';

@UseGuards(AuthGuard)
@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class FileGateway implements OnGatewayConnection {
    constructor(private todoService: TodoService) {}

    handleConnection(client: any, ...args: any[]) {
        console.log('connected file');
    }

    @WebSocketServer()
    server: Server;

    @SubscribeMessage('upload')
    async uploadFileComment(
        @Req() request: RequestWithUserInfo,
        @MessageBody() body: UploadTodoFileDto,
    ) {
        this.server.emit(
            'upload',
            await this.todoService.uploadFile(
                body.bytes,
                body.filename,
                request.user.id,
                body.todoId,
            ),
        );
    }

    @SubscribeMessage('downloadFile')
    async downloadFile(@MessageBody() data: { filename: string }) {
        const filePath = join(__dirname, '../../', 'uploads', data.filename);
        const stream = createReadStream(filePath);
        stream.on('data', (chunk) => {
            return chunk;
        });
    }
}
