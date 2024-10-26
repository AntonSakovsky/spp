import { useWebSocket } from "@context/WebsocketContext";
import { useStore } from "@mobx/rootStore-context";
import { TodoService } from "@services/TodoService";
import { TodoItem } from "@type/models/todo";
import { useEffect } from "react";
import { KanbanBoard } from "./KanbanBoard/KanbanBoard";
import style from "./TodosPage.module.scss";

export const TodosPage = () => {
    const { todoStore } = useStore();
    const { socket, isRetry, setRetry } = useWebSocket();

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                if (!isRetry) {
                    TodoService.getAllTodos(socket, (data: TodoItem[]) => {
                        todoStore.setTodos(data);
                    });
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchTodos();
    }, [todoStore, socket, isRetry, setRetry]);

    return (
        <div className={style.todosPage}>
            <KanbanBoard />
        </div>
    );
};
