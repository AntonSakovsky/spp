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
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { RequestWithUserInfo } from 'src/auth/types/RequestWithUserInfo';
import { TodoCreateDto } from './dto/TodoCreateDto';
import { TodoUpdateDto } from './dto/TodoUpdateDto';
import { TodoService } from './todo.service';
import { TodoDto } from './dto/TodoDto';

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
