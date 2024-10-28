import { Field, InputType, Int } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
import { TodoStatus } from 'src/entities/Todo';

@InputType()
export class TodoCreateDto {
    @Field()
    @IsString()
    task: string;

    @Field(type => TodoStatus)
    @IsEnum(TodoStatus)
    status: TodoStatus;

    @Field(type => Int)
    @IsNumber()
    order: number;

}
