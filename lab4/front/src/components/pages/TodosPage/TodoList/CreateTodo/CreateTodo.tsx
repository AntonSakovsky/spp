import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";

import { useWebSocket } from "@context/WebsocketContext";
import { TodoService } from "@services/TodoService";
import { TodoCreateDto, TodoItem } from "@type/models/todo";
import style from "./CreateTodo.module.scss";

type CreateTodoProps = {
    todo: Pick<TodoItem, "status" | "order">;
    onFail: () => void;
    onSuccess: (data: TodoItem) => void;
};

export const CreateTodo: FC<CreateTodoProps> = ({ todo, onFail }) => {
    const [value, setValue] = useState("");
    const { socket, requestName, setRequestName, isRetry, setRetry } = useWebSocket();

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
            TodoService.createTodo(socket, todoDto);
            setRequestName("createTodo");
        } else {
            onFail();
        }
    }, [value, socket, onFail, setRequestName, todo]);


    useEffect(() => {
        if (requestName === "createTodo" && isRetry) {
            const todoDto: TodoCreateDto = {
                task: value,
                status: todo.status,
                order: todo.order,
            };

            TodoService.createTodo(socket, todoDto);
            setRetry(false);
            setValue("");
        }
    }, [requestName, socket, value, todo, setRetry, isRetry]);

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
