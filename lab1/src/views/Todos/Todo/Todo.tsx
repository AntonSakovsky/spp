import React, { FC } from "react";

import { TodoItem } from "@/types/types.js";
import { UploadFile } from "../../UploadFile/UploadFile.js";

type TodoProps = {
    todo: TodoItem;
};

export const Todo: FC<TodoProps> = ({ todo }) => {
    return (
        <div className={`todo ${todo.status ? "completed" : ""}`}>
            <div className="todo-satus-text-wrap">
                <form action={`todo/${todo.id}`} method="POST" className="todo-status">
                    <input
                        type="submit"
                        value={todo.status ? "Оставить" : "Завершить"}
                        className="todo-status"
                    />
                </form>
                <div className="todo-text">{todo.text}</div>
            </div>

            <div className="todo-date-file-wrap">
                <div className="todo-endDate">
                    to: <span className="date">{todo.end}</span>
                </div>
                <UploadFile file={todo.file} todoId={todo.id} />
            </div>
        </div>
    );
};
