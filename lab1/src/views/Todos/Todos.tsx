import React, { FC } from "react";

import { Todo } from "./Todo/Todo.js";
import { TodoFilter, TodoItem } from "@/types/types.js";
import { FilterTodo } from "../FilterToDo/FilterTodo.js";

type TodosProps = {
    todos: TodoItem[];
}

export const Todos: FC<TodosProps> = ({todos}) => {
    return(
        <div className="todos">
            {
                todos.map(todo => <Todo todo={todo} key={todo.id}/>)
            }
        </div>
    )
}