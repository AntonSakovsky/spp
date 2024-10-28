import { GET_ALL_TODOS } from "@api/query/getAllTodos";
import { useQuery } from "@apollo/client";
import { useStore } from "@mobx/rootStore-context";
import { useEffect } from "react";
import { KanbanBoard } from "./KanbanBoard/KanbanBoard";
import style from "./TodosPage.module.scss";

export const TodosPage = () => {
    const { todoStore } = useStore();
    const { error, data } = useQuery(GET_ALL_TODOS);


    useEffect(() => {
        if (data) {
            todoStore.setTodos(data.allTodos);
        }
    }, [data, error, todoStore]);

    if (error) return <p>Error: {error.message}</p>;


    return (
        <div className={style.todosPage}>
            <KanbanBoard />
        </div>
    );
};
