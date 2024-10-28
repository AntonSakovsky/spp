import { StatusType } from "@type/types";
import { User } from "./user";
import { Comment } from "./comment";

export type TodoItem = {
    id: number;
    task: string;
    comments: Comment[];
    deadline: string;
    order: number;
    description?: string;
    creator: User;
    status: StatusType;
};


export type TodoUpdateDto = Partial<Omit<TodoItem, "creator" | "id" | 'order' | 'comments'>> &
    Required<Pick<TodoItem, "id">>;

export type TodoCreateDto = Pick<TodoItem, 'order' | 'status' | 'task'>