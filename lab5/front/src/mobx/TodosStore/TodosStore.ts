import { Comment } from "@type/models/comment";
import { TodoItem } from "@type/models/todo";
import { Boards, BoardsFilter, StatusType } from "@type/types";
import { makeAutoObservable } from "mobx";

class TodosStore {
    boards: Boards = {
        TODO: [],
        IN_PROGRESS: [],
        DONE: [],
    };

    dragDropBoard: StatusType | null = null;
    draggedTodo: TodoItem | null = null;

    createdTodo: Pick<TodoItem, "status" | "order"> | null = null;

    updatedTodo: TodoItem | null = null;
    previousStatus: StatusType | null = null;

    boardsFilter: BoardsFilter = {
        DONE: "NONE",
        IN_PROGRESS: "NONE",
        TODO: "NONE",
    };

    constructor() {
        makeAutoObservable(this);
    }

    setTodos(todos: TodoItem[]) {
        this.boards = {
            TODO: [],
            IN_PROGRESS: [],
            DONE: [],
        };

        todos.forEach((todo) => {
            this.boards[todo.status] = [...this.boards[todo.status], todo];
        });
    }

    setTodo(todo: TodoItem) {
        if (this.previousStatus) {
            this.boards[todo.status] = [...this.boards[todo.status], todo];

            //deleting from previous board if status changed
            const index = this.boards[this.previousStatus].findIndex((t) => t.id === todo.id);
            if (index !== -1) {
                this.boards[this.previousStatus].splice(index, 1);
            }
        } else {
            //setting new todo
            const index = this.boards[todo.status].findIndex((t) => t.id === todo.id);
            this.boards[todo.status].splice(index, 1, todo);
        }
    }

    setPreviuosStatus(status: StatusType) {
        this.previousStatus = status;
    }

    addTodo(todo: TodoItem) {
        this.boards[todo.status] = [...this.boards[todo.status], todo];
    }

    removeTodo(todo: TodoItem) {
        this.boards[todo.status] = this.boards[todo.status].filter((t) => t.id !== todo.id);
    }

    updateTodosOrder(boardName: StatusType, todos: TodoItem[]) {
        this.boards[boardName] = todos;
    }

    setDragDropBoard(boardName: StatusType) {
        this.dragDropBoard = boardName;
    }

    setDraggedTodo(todo: TodoItem) {
        this.draggedTodo = todo;
    }

    setCreatedTodo(status: StatusType) {
        const items = this.boards[status];
        let order = 1;
        if (items.length !== 0) {
            order = items[items.length - 1].order + 1;
        }

        this.createdTodo = {
            status,
            order,
        };
    }

    resetCreatedDto() {
        this.createdTodo = null;
    }

    setUpdatedTodo(todo: TodoItem | null) {
        this.updatedTodo = todo;
    }

    addUpdatedTodoComment(comment: Comment) {
        if (this.updatedTodo) {
            this.updatedTodo.comments = [...this.updatedTodo.comments, comment];
        }
    }

    toggleDateFilter(status: StatusType) {
        const currentFilter = this.boardsFilter[status];
        if (currentFilter === "NONE") {
            this.boardsFilter[status] = "ASC";
        }
        if (currentFilter === "ASC") {
            this.boardsFilter[status] = "DESC";
        }
        if (currentFilter === "DESC") {
            this.boardsFilter[status] = "NONE";
        }
    }
}

export const todoStore = new TodosStore();
