import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { BiLinkAlt } from "react-icons/bi";
import { RiSendPlaneFill } from "react-icons/ri";

import { useWebSocket } from "@context/WebsocketContext";
import { useStore } from "@mobx/rootStore-context";
import { TodoService } from "@services/TodoService";
import { Comment, TodoCreateCommentDto } from "@type/models/comment";
import { FileDto } from "@type/types";
import style from "./CommentsInput.module.scss";
import { TodoUpdateDto } from "@type/models/todo";

export const CommentsInput = () => {
    const { todoStore } = useStore();
    const [value, setValue] = useState("");
    const { socket } = useWebSocket();

    const sendFile = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] as File;

        try {
            const reader = new FileReader();
            reader.onload = () => {
                const arrayBuffer = reader.result as ArrayBuffer;
                const fileDto: FileDto = {
                    filename: file.name,
                    bytes: arrayBuffer,
                };
                TodoService.upload(socket, fileDto);
            };
            reader.readAsArrayBuffer(file);
        } catch (e) {
            console.log(e);
        }
    };

    const sendMessage = useCallback(async () => {
        if (value) {
            const commentDto: TodoCreateCommentDto = {
                message: value,
                todoId: todoStore.updatedTodo?.id as number,
            };
            try {
                TodoService.createComment(socket, commentDto);
                TodoService.updateTodo(socket, todoStore.updatedTodo as TodoUpdateDto);
            } catch (e) {
                console.log(e);
            } finally {
                setValue("");
            }
        }
    }, [value]);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            const key = e.key;
            if (key === "Enter") {
                sendMessage();
            }
        };

        window.addEventListener("keydown", onKeyDown);

        return () => {
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [sendMessage]);

    useEffect(() => {
        const addComment = (data: Comment) => {
            const comment: Comment = { ...data };
            todoStore.addUpdatedTodoComment(comment);
        };

        socket?.on("upload", addComment);
        socket?.on("createComment", addComment);

        return () => {
            socket?.off("upload");
            socket?.off("createComment");
        };
    }, [socket, todoStore]);

    return (
        <div className={style.commentInput}>
            <div className={style.inputWrap}>
                <input
                    type="text"
                    value={value}
                    placeholder="Write comment..."
                    onChange={(e) => setValue(e.target.value)}
                    className={style.input}
                />
            </div>
            <label htmlFor="file" className={style.sendFileBtn}>
                <BiLinkAlt />
                <input
                    type="file"
                    id="file"
                    accept=".txt, .pdf, .docx, .doc"
                    className={style.fileInput}
                    onChange={sendFile}
                />
            </label>
            <div className={style.sendMessageBtn} onClick={sendMessage}>
                <RiSendPlaneFill />
            </div>
        </div>
    );
};
