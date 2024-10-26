import cn from "classnames";
import { DragEvent, FC, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa6";
import { IoCalendarOutline, IoTrashOutline } from "react-icons/io5";

import { useWebSocket } from "@context/WebsocketContext";
import { useStore } from "@mobx/rootStore-context";
import { TodoItem } from "@type/models/todo";
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
    const { socket } = useWebSocket();
    const [dragged, setDragged] = useState(false);

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

        const currentTodo = { ...todoStore.draggedTodo } as TodoItem;
        if (currentTodo !== todo) {
            todoStore.dropTodoHandler(boardName, todo, socket);
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
