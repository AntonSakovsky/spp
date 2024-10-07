import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from 'src/entities/Todo';
import { User } from 'src/entities/User';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { Comment } from 'src/entities/Comment';

@Module({
    imports: [TypeOrmModule.forFeature([Todo, User, Comment])],
    controllers: [TodoController],
    providers: [TodoService],
})
export class TodoModule {}
