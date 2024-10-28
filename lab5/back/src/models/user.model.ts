import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Comment } from 'src/entities/Comment';
import { Todo, TodoStatus } from 'src/entities/Todo';
import { CommentModel } from 'src/models/comment.model';
import { TodoModel } from './todo.model';

registerEnumType(TodoStatus, {
    name: 'TodoStatus',
});

@ObjectType()
export class UserModel {
    @Field(() => Int)
    id: number;

    @Field()
    username: string;

    @Field()
    email: string;

    @Field()
    password: string;

    @Field(() => [TodoModel])
    todos: TodoModel[];

    @Field(() => [CommentModel])
    comments: CommentModel[];
}
