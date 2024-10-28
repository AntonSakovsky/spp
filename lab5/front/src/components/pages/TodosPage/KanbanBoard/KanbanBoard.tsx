import { observer } from "mobx-react-lite";
import { useState } from "react";

import { DELETE_TODO } from "@api/mutation/deleteTodo";
import { UPDATE_TODO } from "@api/mutation/updateTodo";
import { ApolloError, useMutation } from "@apollo/client";
import { TodoDrawer } from "@components/UI/TodoDrawer/TodoDrawer";
import { useStore } from "@mobx/rootStore-context";
import { TodoItem, TodoUpdateDto } from "@type/models/todo";
import { StatusType } from "@type/types";
import style from "./KanbanBoard.module.scss";
import { StatusBoard } from "./StatusBoard/StatusBoard";

export const KanbanBoard = observer(() => {
    const [isOpen, setIsOpen] = useState(false);
    const { todoStore } = useStore();
    const [deleteTodo] = useMutation(DELETE_TODO);
    const [updateTodo] = useMutation(UPDATE_TODO);

    const openDrawer = (todo: TodoItem) => {
        setIsOpen(true);
        todoStore.setUpdatedTodo(todo);
    };

    const closeDrawer = async () => {
        setIsOpen(false);
        try {
            const { id, deadline, status, task, description } = todoStore.updatedTodo as TodoItem;
            const todoDto: TodoUpdateDto = {
                id,
                deadline,
                description,
                status,
                task,
            };
            await updateTodo({
                variables: {
                    dto: todoDto,
                },
            });
        } catch (error) {
            console.log(error);
        } finally {
            todoStore.setUpdatedTodo(null);
        }
    };

    const onDelete = async (todo: TodoItem) => {
        
        try {
            await deleteTodo({
                variables: {
                    todoId: todo.id,
                },
            });

            todoStore.removeTodo(todo);
        } catch (error: unknown) {
            if(error instanceof ApolloError) {
                if (error.message === "Invalid token") {
                    setTimeout(async () => {
                        await deleteTodo({
                            variables: {
                                todoId: todo.id,
                            },
                        });
            
                        todoStore.removeTodo(todo);
                    }, 50);
                }
            }
           
            console.log(error);
        }
    };

    const onEdit = async (todo: TodoItem) => {
        openDrawer(todo);
    };

    return (
        <div className={style.kanban}>
            {Object.entries(todoStore.boards).map((board, index) => (
                <StatusBoard
                    status={board[0] as StatusType}
                    board={board}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    key={index}
                />
            ))}

            {isOpen && (
                <TodoDrawer
                    onClose={closeDrawer}
                    open={isOpen}
                    updatedTodo={todoStore.updatedTodo as TodoItem}
                />
            )}
        </div>
    );
});
