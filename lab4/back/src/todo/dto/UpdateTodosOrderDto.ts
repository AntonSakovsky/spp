import { IsString } from 'class-validator';
import { TodoDto } from './TodoDto';

export class updateTodosOrderDto {
    todos: TodoDto[];

    @IsString()
    boardName: string;
}
