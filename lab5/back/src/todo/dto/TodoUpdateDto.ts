import { Field, InputType, Int } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import {
    IsDate,
    IsEnum,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';
import { TodoStatus } from 'src/entities/Todo';

@InputType()
export class TodoUpdateDto {
    @Field(() => Int)
    @IsNumber()
    id: number;

    @Field({nullable: true})
    @IsOptional()
    @IsString()
    task?: string;

    @Field(() => TodoStatus, {nullable: true})
    @IsOptional()
    @IsEnum(TodoStatus)
    status?: TodoStatus;

    @Field({nullable: true})
    @Transform(({ value }) => {
        return value ? new Date(value) : null;
    })
    @IsOptional()
    @IsDate()
    deadline?: Date;

    @Field({nullable: true})
    @IsOptional()
    @IsString()
    description?: string;
}
