import { observer } from "mobx-react-lite";
import { FC } from "react";
import { FaPlus } from "react-icons/fa6";

import { AddTodoButton } from "@components/UI/AddTodo/AddTodoButton";
import { TodoItem } from "@type/models/todo";
import { StatusType } from "@type/types";
import { CreateTodo } from "./CreateTodo/CreateTodo";
import { Todo } from "./Todo/Todo";
import style from "./TodoList.module.scss";

type TodoListProps = {
    todos: TodoItem[];
    onDelete: (todo: TodoItem) => void;
    onEdit: (todo: TodoItem) => void;
    boardName: StatusType;
    createdTodo: Pick<TodoItem, "status" | "order"> | null;
    onAddSuccess: (todo: TodoItem) => void;
    onAddFail: () => void;
    addTodoClickHandler: () => void;
};

export const TodoList: FC<TodoListProps> = observer(
    ({
        todos,
        boardName,
        createdTodo,
        onDelete,
        onEdit,
        onAddFail,
        onAddSuccess,
        addTodoClickHandler,
    }) => (
        <div className={style.todoListWrap}>
            <div className={style.todoList}>
                {todos.map((todo) => (
                    <Todo
                        todo={todo}
                        boardName={boardName}
                        onDelete={onDelete}
                        onEdit={onEdit}
                        key={todo.id}
                    />
                ))}

                {createdTodo && boardName === createdTodo.status && (
                    <CreateTodo todo={createdTodo} onSuccess={onAddSuccess} onFail={onAddFail} />
                )}

                <AddTodoButton
                    onClick={addTodoClickHandler}
                    icon={<FaPlus />}
                    text="New"
                    className={style.addTodo}
                />
            </div>
        </div>
    ),
);
