import cn from "classnames";
import { DragEvent, FC, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa6";
import { IoCalendarOutline, IoTrashOutline } from "react-icons/io5";

import { UPDATE_TODO } from "@api/mutation/updateTodo";
import { UPDATE_TODOS_ORDER } from "@api/mutation/updateTodosOrder";
import { useMutation } from "@apollo/client";
import { useStore } from "@mobx/rootStore-context";
import { TodoItem, TodoUpdateDto } from "@type/models/todo";
import { StatusType } from "@type/types";
import { getDeadlineString } from "@utils/dateHelpers/dateHelpers";
import style from "./Todo.module.scss";

type TodoProps = {
    todo: TodoItem;
    boardName: StatusType;
    onDelete: (todo: TodoItem) => void;
    onEdit: (todo: TodoItem) => void;
};

export const Todo: FC<TodoProps> = ({ todo, boardName, onDelete, onEdit }) => {
    const { todoStore } = useStore();
    const [dragged, setDragged] = useState(false);
    const [updateTodo] = useMutation(UPDATE_TODO);
    const [updateTodosOrder] = useMutation(UPDATE_TODOS_ORDER);

    const date = getDeadlineString(todo.deadline);

    const onDragStart = () => {
        setDragged(true);
        todoStore.setDraggedTodo(todo);
        todoStore.setDragDropBoard(boardName);
    };

    const onDragEnd = (e: DragEvent<HTMLDivElement>) => {
        setDragged(false);
        const element = e.currentTarget as HTMLDivElement;
        const divider = element.nextElementSibling as HTMLDivElement;
        divider.style.opacity = "0";
    };

    const onDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const element = e.currentTarget as HTMLDivElement;
        const divider = element.nextElementSibling as HTMLDivElement;
        divider.style.opacity = "1";
    };

    const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
        const element = e.currentTarget as HTMLDivElement;
        const divider = element.nextElementSibling as HTMLDivElement;
        divider.style.opacity = "0";
    };

    const onDrop = async (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const element = e.currentTarget as HTMLDivElement;
        const divider = element.nextElementSibling as HTMLDivElement;
        divider.style.opacity = "0";

        const currentTodo = todoStore.draggedTodo as TodoItem;
        if (currentTodo !== todo) {
            const boards = todoStore.boards;
            const currentBoard = todoStore.dragDropBoard as StatusType;
            const currentBoardItems = boards[currentBoard];

            const currentTodoIndex = currentBoardItems.findIndex(
                (t) => t.id === currentTodo.id,
            );

            currentBoardItems.splice(currentTodoIndex, 1);

            const dropBoardItems = boards[boardName];
            const dropIndex = dropBoardItems.findIndex((t) => t.id === todo.id);
            currentTodo.status = boardName;
            dropBoardItems.splice(dropIndex + 1, 0, currentTodo);

            try {
                const todoDto: TodoUpdateDto = { id: currentTodo.id, status: boardName };
                await updateTodo({
                    variables: {
                        dto: todoDto,
                    },
                });

                let reorderedTodos = dropBoardItems.map((todo, ind) => {
                    todo.order = ind + 1;

                    return todo;
                });

                let todosDto = reorderedTodos.map((todo) => ({
                    id: todo.id,
                    order: todo.order,
                }));
                await updateTodosOrder({
                    variables: {
                        dto: todosDto,
                    },
                });
                todoStore.updateTodosOrder(boardName, reorderedTodos);

                reorderedTodos = currentBoardItems.map((todo, ind) => {
                    todo.order = ind + 1;

                    return todo;
                });

                todosDto = reorderedTodos.map((todo) => ({
                    id: todo.id,
                    order: todo.order,
                }));
                await updateTodosOrder({
                    variables: {
                        dto: todosDto,
                    },
                });
                todoStore.updateTodosOrder(currentBoard, reorderedTodos);
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className={style.todoWrap}>
            <div
                className={cn(style.todo, { [style.dragged]: dragged })}
                draggable
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                <p className={style.task}>{todo.task}</p>
                <div className={style.tools}>
                    <div className={style.editIconWrap} onClick={() => onEdit(todo)}>
                        <AiFillEdit className={style.editIcon} />
                    </div>
                    <div className={style.deleteIconWrap} onClick={() => onDelete(todo)}>
                        <IoTrashOutline className={style.deleteIcon} />
                    </div>
                </div>

                <div className={style.todoFooter}>
                    <div className={style.comments}>
                        <div className={style.commentIconWrap}>
                            <FaRegCommentDots className={style.commentIcon} />
                        </div>
                        <span className={style.countComments}>{todo.comments.length}</span>
                    </div>
                    <div className={style.calendar}>
                        <span className={style.date}>{date}</span>
                        <div className={style.calendarIconWrap}>
                            <IoCalendarOutline className={style.calendarIcon} />
                        </div>
                    </div>
                </div>
            </div>

            <div className={style.divider}></div>
        </div>
    );
};
