import React, { FC } from "react";

import { TodoFilter, TodoItem } from "@/types/types.js";
import { AddTodo } from "./AddTodo/AddTodo.js";
import { FilterTodo } from "./FilterToDo/FilterTodo.js";
import { Todos } from "./Todos/Todos.js";

type AppProps = {
    todos: TodoItem[];
    filter: TodoFilter;
};

export const App: FC<AppProps> = ({ todos, filter }) => {
    return (
        <div className="app-container">
            <AddTodo />
            <FilterTodo filter={filter} />
            {todos.length !== 0 && <Todos todos={todos} />}
        </div>
    );
};
