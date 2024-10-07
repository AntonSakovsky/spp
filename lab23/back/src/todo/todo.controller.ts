import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Req,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/auth.guard';
import { RequestWithUserInfo } from 'src/auth/types/RequestWithUserInfo';
import { multerOptions } from './config/multer.config';
import { TodoCreateDto } from './dto/TodoCreateDto';
import { TodoDto } from './dto/TodoDto';
import { TodoUpdateDto } from './dto/TodoUpdateDto';
import { UploadTodoFileDto } from './dto/UploadTodoFileDto';
import { TodoService } from './todo.service';
import { CommentCreateDto } from './dto/CommentCreateDto';

@UseGuards(AuthGuard)
@Controller('todos')
export class TodoController {
    constructor(private todoService: TodoService) {}

    @Get()
    async getTodos(@Req() request: RequestWithUserInfo) {
        const todos = await this.todoService.getTodos(request.user.id);

        return todos.sort((a, b) => a.order - b.order);
    }

    @Post()
    async createTodo(
        @Req() request: RequestWithUserInfo,
        @Body() todoDto: TodoCreateDto,
    ) {
        return this.todoService.createTodo(request.user.id, todoDto);
    }

    @UseInterceptors(FileInterceptor('file', multerOptions))
    @Post('upload')
    async uploadFileComment(
        @UploadedFile() file: Express.Multer.File,
        @Req() request: RequestWithUserInfo,
        @Body() body: UploadTodoFileDto,
    ) {
        return await this.todoService.uploadFile(
            file,
            request.user.id,
            body.todoId,
        );
    }

    @Post('comment')
    async createComment(@Req() request: RequestWithUserInfo,@Body() commentDto: CommentCreateDto) {
        return this.todoService.createTodoComment(commentDto, request.user.id);
    }

    @Put()
    async updateTodo(@Body() todoDto: TodoUpdateDto) {
        return this.todoService.updateTodo(todoDto);
    }

    @Put('order')
    async updateTodosOrder(@Body() todos: TodoDto[]) {
        return this.todoService.updateTodosOrder(todos);
    }

    @Delete(':todoId')
    async deleteTodo(@Param('todoId', new ParseIntPipe()) todoId: number) {
        return this.todoService.deleteTodo(todoId);
    }
}
