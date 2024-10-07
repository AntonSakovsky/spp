import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";

import { TodoService } from "@services/TodoService";
import { TodoCreateDto, TodoItem } from "@type/models/todo";
import style from "./CreateTodo.module.scss";

type CreateTodoProps = {
    todo: Pick<TodoItem, "status" | "order">;
    onSuccess: (todo: TodoItem) => void;
    onFail: () => void;
};

export const CreateTodo: FC<CreateTodoProps> = ({ todo, onSuccess, onFail }) => {
    const [value, setValue] = useState("");

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const addTodo = useCallback(async () => {
        if (value) {
            const todoDto: TodoCreateDto = {
                task: value,
                status: todo.status,
                order: todo.order,
            };
            try {
                const response = await TodoService.createTodo(todoDto);
                onSuccess(response.data);
            } catch (error) {
                console.log("Unable to create todo, ", error);
                onFail();
            }
        } else {
            onFail();
        }
    }, [value]);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            const key = e.key;
            if (key === "Enter") {
                addTodo();
            }
        };

        window.addEventListener("keydown", onKeyDown);

        return () => {
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [addTodo]);

    return (
        <div className={style.todo}>
            <input
                value={value}
                autoFocus
                onChange={onChange}
                onBlur={addTodo}
                className={style.taskInput}
            />
        </div>
    );
};
