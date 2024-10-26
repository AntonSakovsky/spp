import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useState } from "react";

import { TodoDrawer } from "@components/UI/TodoDrawer/TodoDrawer";
import { useWebSocket } from "@context/WebsocketContext";
import { useStore } from "@mobx/rootStore-context";
import { TodoService } from "@services/TodoService";
import { TodoItem, TodoUpdateDto } from "@type/models/todo";
import { StatusType } from "@type/types";
import style from "./KanbanBoard.module.scss";
import { StatusBoard } from "./StatusBoard/StatusBoard";

export const KanbanBoard = observer(() => {
    const [isOpen, setIsOpen] = useState(false);
    const { todoStore } = useStore();
    const { socket, requestName, setRequestName, isRetry, setRetry } = useWebSocket();

    const openDrawer = useCallback(
        (todo: TodoItem) => {
            setIsOpen(true);
            todoStore.setUpdatedTodo(todo);
        },
        [todoStore],
    );

    const closeDrawer = useCallback(async () => {
        setIsOpen(false);
        try {
            const todoDto: TodoUpdateDto = { ...(todoStore.updatedTodo as TodoItem) };
            TodoService.updateTodo(socket, todoDto);
            setRequestName("updateTodo");
        } catch (error) {
            console.log(error);
        }
    }, [setRequestName, socket]);

    const onDelete = useCallback(
        async (todo: TodoItem) => {
                TodoService.deleteTodo(socket, todo.id);
                setRequestName('deleteTodo');
        },
        [socket],
    );

    const onEdit = useCallback(
        async (todo: TodoItem) => {
            openDrawer(todo);
        },
        [openDrawer],
    );

    useEffect(() => {
        if (requestName === "updateTodo" && isRetry) {
            closeDrawer();
            setRetry(false);
        }
    }, [requestName, closeDrawer, isRetry, setRetry]);

    useEffect(() => {
        socket?.on("updateTodo", (data: TodoItem) => {
            todoStore.setTodo(data);
        });

        socket?.on("deleteTodo", (data: TodoItem) => {
            todoStore.removeTodo(data);
        });
    }, [socket, todoStore]);

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
