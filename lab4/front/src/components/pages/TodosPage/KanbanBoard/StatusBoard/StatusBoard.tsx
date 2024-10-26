import { observer } from "mobx-react-lite";
import { DragEvent, FC, useCallback, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import { IoFilter } from "react-icons/io5";
import { TiArrowDownThick, TiArrowUpThick } from "react-icons/ti";

import { AddTodoButton } from "@components/UI/AddTodo/AddTodoButton";
import { useWebSocket } from "@context/WebsocketContext";
import { useStore } from "@mobx/rootStore-context";
import { TodoItem } from "@type/models/todo";
import { StatusType } from "@type/types";
import { sortTodosByDate } from "@utils/sorting/sortTodosByDate";
import { TodoList } from "../../TodoList/TodoList";
import { Status } from "./Status/Status";
import style from "./StatusBoard.module.scss";

type StatusBoardProps = {
    status: StatusType;
    board: [string, TodoItem[]];
    onDelete: (todo: TodoItem) => void;
    onEdit: (todo: TodoItem) => void;
};

export const StatusBoard: FC<StatusBoardProps> = observer(({ status, board, onDelete, onEdit }) => {
    const { todoStore } = useStore();
    const { socket, requestName, setRequestName, isRetry, setRetry } = useWebSocket();
    const todos = sortTodosByDate(board[1], todoStore.boardsFilter[status]);

    const dropHandler = async (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setRequestName("updateTodosOrder");
        todoStore.dropTodoHandler(status, null, socket);
    };

    const onDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const addTodoClickHandler = () => {
        todoStore.setCreatedTodo(status);
    };

    const onAddSuccess = useCallback(
        (todo: TodoItem) => {
            todoStore.addTodo(todo);
            todoStore.resetCreatedDto();
        },
        [todoStore],
    );

    const onAddFail = () => {
        todoStore.resetCreatedDto();
    };

    useEffect(() => {
        if (socket?.listeners("createTodo").length === 0) {
            socket?.on("createTodo", (data: TodoItem) => {
                onAddSuccess(data);
            });
        }

        if (socket?.listeners("updateTodosOrder").length === 0) {
            socket?.on("updateTodosOrder", (dto: { boardName: StatusType; todos: TodoItem[] }) => {
                console.log(dto);
                todoStore.setBoardTodos(dto.boardName, dto.todos);
            });
        }

        return () => {
            socket?.off("createTodo");
            socket?.off("updateTodosOrder");
        };
    }, [socket, onAddSuccess, todoStore]);

    useEffect(() => {
        console.log(requestName);
        if (requestName === "updateTodosOrder" && isRetry) {
            todoStore.dropTodoHandler(status, null, socket);
            setRetry(false);
        }
    }, [requestName, socket, todoStore, isRetry, setRetry]);

    return (
        <div className={style.statusBoard} onDrop={dropHandler} onDragOver={onDragOver}>
            <div className={style.statusBoardHeader}>
                <div className={style.statusWrap}>
                    <Status status={board[0] as StatusType} />
                    <span className={style.count}>{todos.length}</span>
                </div>
                <div className={style.tools}>
                    <div
                        className={style.filter}
                        onClick={() => todoStore.toggleDateFilter(status)}
                    >
                        {todoStore.boardsFilter[status] === "NONE" && <IoFilter />}
                        {todoStore.boardsFilter[status] === "ASC" && <TiArrowUpThick />}
                        {todoStore.boardsFilter[status] === "DESC" && <TiArrowDownThick />}
                    </div>

                    <AddTodoButton
                        icon={<FaPlus />}
                        text=""
                        onClick={addTodoClickHandler}
                        className={style.addTodoSmall}
                    />
                </div>
            </div>

            <TodoList
                todos={todos}
                onDelete={onDelete}
                onEdit={onEdit}
                boardName={board[0] as StatusType}
                createdTodo={todoStore.createdTodo}
                addTodoClickHandler={addTodoClickHandler}
                onAddFail={onAddFail}
                onAddSuccess={onAddSuccess}
            />
        </div>
    );
});
