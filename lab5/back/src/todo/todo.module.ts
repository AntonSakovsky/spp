import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Comment } from 'src/entities/Comment';
import { Todo } from 'src/entities/Todo';
import { User } from 'src/entities/User';
import { TodoResolver } from './todo.resolver';
import { TodoService } from './todo.service';

@Module({
    imports: [TypeOrmModule.forFeature([Todo, User, Comment])],
    controllers: [],
    providers: [TodoService, TodoResolver],
    exports: [TodoService],
})
export class TodoModule {}
