import { TodoItem } from "@type/models/todo";
import { DateFilter } from "@type/types";

export const sortTodosByDate = (todos: TodoItem[], filter: DateFilter) => {
    switch (filter) {
        case "ASC":
            return todos.slice().sort(
                (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime(),
            );
        case "DESC":
            return todos.slice().sort(
                (a, b) => new Date(b.deadline).getTime() - new Date(a.deadline).getTime(),
            );
        default:
            return todos;
    }
};
