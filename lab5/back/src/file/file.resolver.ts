import { Res, UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { ServerResponse } from 'http';
import { join } from 'path';
import { AuthGuard } from 'src/auth/auth.guard';
import { RequestWithUserInfo } from 'src/auth/types/RequestWithUserInfo';
import { CommentModel } from 'src/models/comment.model';
import { TodoService } from 'src/todo/todo.service';

@UseGuards(AuthGuard)
@Resolver()
export class FileResolver {
    constructor(private todoService: TodoService) {}

    @Query(() => Boolean, { name: 'downloadFile' })
    async downloadFile(
        @Args('filename') filename: string,
        @Context() context: any,
        @Res() response: Response,
    ) {
        const filePath = join(__dirname, '../../', 'uploads', filename);
        const resp = response.req.res as ServerResponse;
        
        resp.setHeader(
            'Content-Disposition',
            `attachment; filename=${filename}`,
        );
        resp.setHeader('Content-Type', 'application/octet-stream');

        const fileStream = createReadStream(filePath);
        fileStream.pipe(resp);

        return true;
    }

    @Mutation(() => CommentModel, { name: 'uploadFile' })
    async uploadFile(
        @Context() context: any,
        @Args({ name: 'file', type: () => String }) fileData: string,
        @Args({ name: 'filename', type: () => String }) filename: string,
        @Args({ name: 'todoId', type: () => Int }) todoId: number,
    ) {
        const request: RequestWithUserInfo = context.req;
        const result = await this.todoService.uploadFile(
            fileData,
            filename,
            request.user.id,
            todoId,
        );
        return result;
    }
}
