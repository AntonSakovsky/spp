/* eslint-disable @typescript-eslint/no-explicit-any */
import { userStore } from "@mobx/UserStore/UserStore";
import { TodoCreateCommentDto } from "@type/models/comment";
import { TodoCreateDto, TodoItem, TodoUpdateDto } from "@type/models/todo";
import { FileDto, StatusType } from "@type/types";
import { Socket } from "socket.io-client";

export class TodoService {
    static getAllTodos(socket: Socket | null, cb: any) {
        if (socket) {
            socket.auth = {
                token: userStore.accessToken,
            };

            socket.emit("getAllTodos", null, cb);
        }
    }

    static createTodo(socket: Socket | null, todoDto: TodoCreateDto) {
        if (socket) {
            socket.auth = {
                token: userStore.accessToken,
            };

            socket.emit("createTodo", todoDto);
        }
    }

    static updateTodo(socket: Socket | null, todoDto: TodoUpdateDto) {
        if (socket) {
            socket.auth = {
                token: userStore.accessToken,
            };

            socket.emit("updateTodo", todoDto);
        }
    }

    static createComment(socket: Socket | null, todoDto: TodoCreateCommentDto) {
        if (socket) {
            socket.auth = {
                token: userStore.accessToken,
            };

            socket.emit("createComment", todoDto);
        }
    }

    static updateTodoOrder(socket: Socket | null, boardName: StatusType, todos: TodoItem[]) {
        if (socket) {
            socket.auth = {
                token: userStore.accessToken,
            };

            socket.emit("updateTodosOrder", {boardName, todos});
        }
    }

    static async deleteTodo(socket: Socket | null, todoId: number) {
        if (socket) {
            socket.auth = {
                token: userStore.accessToken,
            };

            socket.emit("deleteTodo", { todoId });
        }
    }

    static async upload(socket: Socket | null, fileDto: FileDto) {
        if (socket) {
            socket.auth = {
                token: userStore.accessToken,
            };

            socket.emit("upload", fileDto);
        }
    }

    static download(socket: Socket | null, filename: string) {
        if (socket) {
            socket.auth = {
                token: userStore.accessToken,
            };

            socket.emit("downloadFile", { filename });
        }
    }
}
