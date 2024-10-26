import { Transform } from 'class-transformer';
import {
    IsDate,
    IsEnum,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';
import { TodoStatus } from 'src/entities/Todo';

export class TodoUpdateDto {
    @IsNumber()
    id: number;

    @IsOptional()
    @IsString()
    task?: string;

    @IsOptional()
    @IsEnum(TodoStatus)
    status?: TodoStatus;

    @Transform(({ value }) => {
        return value ? new Date(value) : null;
    })
    @IsOptional()
    @IsDate()
    deadline?: Date;

    @IsOptional()
    @IsString()
    description?: string;
}
