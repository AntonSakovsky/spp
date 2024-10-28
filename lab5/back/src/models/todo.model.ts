import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { TodoStatus } from 'src/entities/Todo';
import { CommentModel } from 'src/models/comment.model';
import { UserModel } from 'src/models/user.model';
import { MyDateTime } from './MyDate';

registerEnumType(TodoStatus, {
    name: 'TodoStatus',
});

@ObjectType()
export class TodoModel {
    @Field((type) => Int)
    id: number;

    @Field()
    task: string;

    @Field(() => MyDateTime, { nullable: true })
    deadline: Date;

    @Field((type) => TodoStatus)
    status: TodoStatus;

    @Field((type) => Int)
    order: number;

    @Field({ nullable: true })
    description?: string;

    @Field((type) => [CommentModel])
    comments: CommentModel[];

    @Field((type) => UserModel)
    creator: UserModel;
}
