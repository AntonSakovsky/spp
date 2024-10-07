import { observer } from "mobx-react-lite";
import { useState } from "react";

import { TodoDrawer } from "@components/UI/TodoDrawer/TodoDrawer";
import { useStore } from "@mobx/rootStore-context";
import { TodoService } from "@services/TodoService";
import { TodoItem, TodoUpdateDto } from "@type/models/todo";
import { StatusType } from "@type/types";
import style from "./KanbanBoard.module.scss";
import { StatusBoard } from "./StatusBoard/StatusBoard";

export const KanbanBoard = observer(() => {
    const [isOpen, setIsOpen] = useState(false);
    const { todoStore } = useStore();

    const openDrawer = (todo: TodoItem) => {
        setIsOpen(true);
        todoStore.setUpdatedTodo(todo);
    };

    const closeDrawer = async () => {
        setIsOpen(false);
        try {
            const todoDto: TodoUpdateDto = { ...(todoStore.updatedTodo as TodoItem) };
            await TodoService.updateTodo(todoDto);
            todoStore.setTodo(todoStore.updatedTodo as TodoItem);
        } catch (error) {
            console.log(error);
        } finally {
            todoStore.setUpdatedTodo(null);
        }
    };

    const onDelete = async (todo: TodoItem) => {
        try {
            await TodoService.deleteTodo(todo.id);
            todoStore.removeTodo(todo);
        } catch (error) {
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
