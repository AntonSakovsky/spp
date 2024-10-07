import { Transform } from 'class-transformer';
import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
import { TodoStatus } from 'src/entities/Todo';

export class TodoCreateDto {
    @IsString()
    task: string;

    @IsEnum(TodoStatus)
    status: TodoStatus;

    @IsNumber()
    order: number;

}
