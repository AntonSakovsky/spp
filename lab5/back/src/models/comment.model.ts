import { Field, Int, ObjectType } from '@nestjs/graphql';
import { TodoModel } from 'src/models/todo.model';
import { UserModel } from 'src/models/user.model';

@ObjectType()
export class CommentModel {
    @Field((type) => Int)
    id: number;

    @Field({nullable: true})
    message?: string;

    @Field({nullable: true})
    filename?: string;

    @Field({nullable: true})
    filepath?: string;

    @Field((type) => UserModel, {nullable: true})
    user: UserModel;

    @Field((type) => TodoModel)
    todo: TodoModel;
}
