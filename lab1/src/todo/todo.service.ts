import { TodoFilter, TodoItem } from "@/types/types";
import { TodoAddDto } from "./dto/TodoAddDto.js";

export class TodoService {
    static todos: TodoItem[] = [];
    private filter: 'all' | 'done' = 'all'

    getAllTodos() {
        if(this.filter === 'done') {
            return TodoService.todos.filter(todo => todo.status)
        }

        return TodoService.todos
     
    }

    getFilter() {
        return this.filter;
    }

    addToDo(todoAddDto: TodoAddDto) {
        const id = TodoService.todos.length
            ? TodoService.todos[TodoService.todos.length - 1].id + 1
            : 1;

        const newTodo: TodoItem = {
            id,
            text: todoAddDto.text,
            end: new Date(todoAddDto.end).toLocaleDateString('ru-Ru'),
            status: false,
            file: undefined,
        };

        TodoService.todos.unshift(newTodo);
    }

    changeStatus(todoId: number){
        TodoService.todos = TodoService.todos.map(todo => {
            if(todo.id === todoId) {
                todo.status = !todo.status
                return todo
            }

            return todo
           
        } );
    }

    changeFilter(filter: TodoFilter){
        this.filter = filter;
    }

    uploadFile(todoId: number, fileName: string) {
        TodoService.todos = TodoService.todos.map((todo) => {
            if (todo.id === todoId) {
                todo.file = {
                    name: fileName,
                    src: `/uploads/${fileName}`,
                };
            }

            return todo;
        });
    }
}
