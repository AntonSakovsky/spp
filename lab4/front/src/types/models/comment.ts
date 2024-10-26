import { TodoItem } from "./todo";
import { User } from "./user";

export type Comment = {
    id: number;
    filename?: string;
    filepath?: string;
    message: string | null;
    todo: TodoItem;
    user: User;
};

export type TodoCreateCommentDto = {
    todoId: number;
    message: string;
};
