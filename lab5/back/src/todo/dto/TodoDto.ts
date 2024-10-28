import { Field, InputType, Int } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
import { Comment } from 'src/entities/Comment';
import { TodoStatus } from 'src/entities/Todo';
import { User } from 'src/entities/User';
import { CommentModel } from 'src/models/comment.model';
import { UserModel } from 'src/models/user.model';

@InputType()
export class TodoDto {
    @Field(() => Int)
    @IsNumber()
    id: number;

    @Field()
    @IsString()
    task: string;

    @Field(() => TodoStatus)
    @IsEnum(TodoStatus)
    status: TodoStatus;

    @Field(() => Int)
    @IsNumber()
    order: number;

    @Field()
    @IsDate()
    @Transform(({ value }) => (value ? new Date(value) : null))
    deadline: Date;

    @Field({ nullable: true })
    @IsString()
    description?: string;

    @Field(() => [CommentModel])
    comments: Comment[];

    @Field(() => UserModel)
    creator: User;
}
