import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { BiLinkAlt } from "react-icons/bi";
import { RiSendPlaneFill } from "react-icons/ri";

import { useStore } from "@mobx/rootStore-context";
import { TodoService } from "@services/TodoService";
import { Comment, TodoCreateCommentDto } from "@type/models/comment";
import style from "./CommentsInput.module.scss";

export const CommentsInput = () => {
    const { todoStore } = useStore();
    const [value, setValue] = useState("");

    const sendFile = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] as File;
        const formData = new FormData();
        formData.append("file", file);
        formData.append("todoId", Number(todoStore.updatedTodo?.id).toString());
        try {
            const response = await TodoService.upload(formData);
            const comment: Comment = { ...response.data };

            todoStore.addUpdatedTodoComment(comment);
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
                const response = await TodoService.createComment(commentDto);
                const comment: Comment = { ...response.data };

                todoStore.addUpdatedTodoComment(comment);
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
