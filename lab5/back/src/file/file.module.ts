import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/entities/Comment';
import { Todo } from 'src/entities/Todo';
import { User } from 'src/entities/User';
import { TodoService } from 'src/todo/todo.service';
import { FileResolver } from './file.resolver';
import { FileService } from './file.service';

@Module({
    imports: [TypeOrmModule.forFeature([Todo, User, Comment])],
    controllers: [],
    providers: [FileResolver, FileService, TodoService],
})
export class FileModule {}
