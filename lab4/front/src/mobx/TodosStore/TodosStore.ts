import { makeAutoObservable } from "mobx";
import { Socket } from "socket.io-client";

import { TodoService } from "@services/TodoService";
import { Comment } from "@type/models/comment";
import { TodoItem, TodoUpdateDto } from "@type/models/todo";
import { Boards, BoardsFilter, StatusType } from "@type/types";

class TodosStore {
    boards: Boards = {
        todo: [],
        "in progress": [],
        done: [],
    };

    dragDropBoard: StatusType | null = null;
    draggedTodo: TodoItem | null = null;

    createdTodo: Pick<TodoItem, "status" | "order"> | null = null;

    updatedTodo: TodoItem | null = null;
    previousStatus: StatusType | null = null;

    boardsFilter: BoardsFilter = {
        done: "NONE",
        "in progress": "NONE",
        todo: "NONE",
    };

    constructor() {
        makeAutoObservable(this);
    }

    setTodos(todos: TodoItem[]) {
        this.boards = {
            todo: [],
            "in progress": [],
            done: [],
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

    //boardName - board where draggedTodo has dropped
    //todo - todo, where draggedTodo has dropped
    dropTodoHandler(boardName: StatusType, todo: TodoItem | null, socket: Socket | null) {
        const currentTodo = this.draggedTodo as TodoItem;
        const currentBoard = this.dragDropBoard as StatusType;
        const currentBoardItems = this.boards[currentBoard];

        const currentTodoIndex = currentBoardItems.indexOf(currentTodo);

        currentBoardItems.splice(currentTodoIndex, 1);

        const dropBoardItems = this.boards[boardName];
        currentTodo.status = boardName;
        if (todo) {
            const dropIndex = dropBoardItems.indexOf(todo);
            dropBoardItems.splice(dropIndex + 1, 0, currentTodo);
        } else {
            dropBoardItems.push(currentTodo);
        }

        const todoDto: TodoUpdateDto = { id: currentTodo.id, status: boardName };
        TodoService.updateTodo(socket, todoDto);

        todoStore.updateTodosOrder(socket, boardName, dropBoardItems);
        todoStore.updateTodosOrder(socket, currentBoard as StatusType, currentBoardItems);
    }

    async updateTodosOrder(socket: Socket | null, boardName: StatusType, todos: TodoItem[]) {
        const reorderedTodos = todos.map((todo, ind) => {
            todo.order = ind + 1;

            return todo;
        });

        try {
            TodoService.updateTodoOrder(socket, boardName, reorderedTodos);
        } catch (error) {
            console.error("Error updating todo order:", error);
        }
    }

    setBoardTodos(boardName: StatusType, todos: TodoItem[]) {
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

    reset() {
        this.boards = {
            todo: [],
            "in progress": [],
            done: [],
        };

        this.dragDropBoard = null;
        this.draggedTodo = null;

        this.createdTodo = null;

        this.updatedTodo = null;
        this.previousStatus = null;
    }
}

export const todoStore = new TodosStore();
