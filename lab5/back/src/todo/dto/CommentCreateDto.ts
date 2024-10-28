import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class CommentCreateDto {
    @Field(() => Int)
    @IsNumber()
    todoId: number;

    @Field()
    @IsString()
    message: string;
}
