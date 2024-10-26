import { Transform } from 'class-transformer';
import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
import { Comment } from 'src/entities/Comment';
import { TodoStatus } from 'src/entities/Todo';
import { User } from 'src/entities/User';

export class TodoDto {
    @IsNumber()
    id: number;

    @IsString()
    task: string;

    @IsEnum(TodoStatus)
    status: TodoStatus;

    @IsNumber()
    order: number;

    @IsDate()
    @Transform(({ value }) => value ? new Date(value) : null)
    deadline: Date;

    @IsString()
    description?: string;

    comments: Comment[];

    creator: User;
}
