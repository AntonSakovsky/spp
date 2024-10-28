import { Injectable } from '@nestjs/common';
import { TodoService } from 'src/todo/todo.service';

@Injectable()
export class FileService {
    constructor(private todoService: TodoService){}
    
}
