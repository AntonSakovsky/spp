import { useStore } from "@mobx/rootStore-context";
import { TodoService } from "@services/TodoService";
import { useEffect } from "react";
import { KanbanBoard } from "./KanbanBoard/KanbanBoard";
import style from "./TodosPage.module.scss";

export const TodosPage = () => {
    const { todoStore } = useStore();

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const { data } = await TodoService.getAllTodos();
                todoStore.setTodos(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchTodos();
    }, [todoStore]);

    return (
        <div className={style.todosPage}>
            <KanbanBoard />
        </div>
    );
};
