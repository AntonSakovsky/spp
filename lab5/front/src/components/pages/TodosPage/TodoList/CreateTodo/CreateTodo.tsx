import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";

import { CREATE_TODO } from "@api/mutation/createTodo";
import { ApolloError, useMutation } from "@apollo/client";
import { TodoCreateDto, TodoItem } from "@type/models/todo";
import style from "./CreateTodo.module.scss";

type CreateTodoProps = {
    todo: Pick<TodoItem, "status" | "order">;
    onSuccess: (todo: TodoItem) => void;
    onFail: () => void;
};

export const CreateTodo: FC<CreateTodoProps> = ({ todo, onSuccess, onFail }) => {
    const [value, setValue] = useState("");
    const [createTodo] = useMutation(CREATE_TODO);

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
                const { data } = await createTodo({
                    variables: {
                        dto: todoDto,
                    },
                });

                onSuccess(data.createTodo as TodoItem);
            } catch (error: unknown) {
                if(error instanceof ApolloError) {
                    if (error.message === 'Invalid token') {
                        setTimeout(async () => {
                            const { data } = await createTodo({
                                variables: {
                                    dto: todoDto,
                                },
                            });
                            onSuccess(data.createTodo as TodoItem);
                        }, 50);
                    }
                }
                
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
