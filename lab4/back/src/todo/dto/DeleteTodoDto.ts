import { IsNumber } from 'class-validator';

export class DeleteTodoDto {
    @IsNumber()
    todoId: number;
}
