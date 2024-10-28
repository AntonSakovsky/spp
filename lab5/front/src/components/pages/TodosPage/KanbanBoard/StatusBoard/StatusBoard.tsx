import { observer } from "mobx-react-lite";
import { DragEvent, FC } from "react";
import { FaPlus } from "react-icons/fa6";
import { IoFilter } from "react-icons/io5";
import { TiArrowDownThick, TiArrowUpThick } from "react-icons/ti";

import { UPDATE_TODO } from "@api/mutation/updateTodo";
import { UPDATE_TODOS_ORDER } from "@api/mutation/updateTodosOrder";
import { useMutation } from "@apollo/client";
import { AddTodoButton } from "@components/UI/AddTodo/AddTodoButton";
import { useStore } from "@mobx/rootStore-context";
import { TodoItem, TodoUpdateDto } from "@type/models/todo";
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
    const todos = sortTodosByDate(board[1], todoStore.boardsFilter[status]);
    const [updateTodo] = useMutation(UPDATE_TODO);
    const [updateTodosOrder] = useMutation(UPDATE_TODOS_ORDER);

    const dropHandler = async (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        const currentTodo = todoStore.draggedTodo as TodoItem;
        const boards = todoStore.boards;
        const currentBoard = todoStore.dragDropBoard as StatusType;
        const currentBoardItems = [...boards[currentBoard]];

        const currentTodoIndex = currentBoardItems.indexOf(currentTodo);

        currentBoardItems.splice(currentTodoIndex, 1);

        const dropBoardItems = [...boards[status]];
        currentTodo.status = status;
        dropBoardItems.push(currentTodo);

        try {
            const todoDto: TodoUpdateDto = { id: currentTodo.id, status };
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
            todoStore.updateTodosOrder(status, reorderedTodos);  

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
    };

    const onDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const addTodoClickHandler = () => {
        todoStore.setCreatedTodo(status);
    };

    const onAddSuccess = (todo: TodoItem) => {
        todoStore.addTodo(todo);
        todoStore.resetCreatedDto();
    };

    const onAddFail = () => {
        todoStore.resetCreatedDto();
    };

    return (
        <div className={style.statusBoard} onDrop={dropHandler} onDragOver={onDragOver}>
            <div className={style.statusBoardHeader}>
                <div className={style.statusWrap}>
                    <Status status={board[0] as StatusType} />
                    <span className={style.count}>{board[1].length}</span>
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
