import { api } from "@api/index";
import { Comment, TodoCreateCommentDto } from "@type/models/comment";
import { TodoCreateDto, TodoItem, TodoUpdateDto } from "@type/models/todo";
import { AxiosResponse } from "axios";

export class TodoService {
    static getAllTodos(): Promise<AxiosResponse<TodoItem[]>> {
        return api.get<TodoItem[]>("todos");
    }

    static createTodo(todoDto: TodoCreateDto): Promise<AxiosResponse<TodoItem>> {
        return api.post<TodoItem>("todos", todoDto);
    }

    static updateTodo(todoDto: TodoUpdateDto): Promise<AxiosResponse<TodoUpdateDto>> {
        return api.put<TodoUpdateDto>("todos", todoDto);
    }

    static createComment(todoDto: TodoCreateCommentDto): Promise<AxiosResponse<Comment>> {
        return api.post<Comment>("todos/comment", todoDto);
    }

    static updateTodoOrder(todos: TodoItem[]): Promise<AxiosResponse<TodoItem[]>> {
        return api.put<TodoItem[]>("todos/order", todos);
    }

    static async deleteTodo(todoId: number) {
        return api.delete(`todos/${todoId}`);
    }

    static async upload(formData: FormData): Promise<AxiosResponse<Comment>> {
        return api.post<Comment>("todos/upload", formData);
    }
}
