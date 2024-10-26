import { Module } from '@nestjs/common';
import { TodoModule } from 'src/todo/todo.module';
import { FileController } from './file.controller';
import { FileGateway } from './file.gateaway';
import { TodoService } from 'src/todo/todo.service';
import { Todo } from 'src/entities/Todo';
import { User } from 'src/entities/User';
import { Comment } from 'src/entities/Comment';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, User, Comment])],
    controllers: [FileController],
    providers: [FileGateway, TodoService],
})
export class FileModule {}
