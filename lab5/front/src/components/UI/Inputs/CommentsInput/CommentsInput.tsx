import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { BiLinkAlt } from "react-icons/bi";
import { RiSendPlaneFill } from "react-icons/ri";

import { CREATE_COMMENT } from "@api/mutation/createComment";
import { FILE_UPLOAD } from "@api/mutation/fileUpload";
import { useMutation } from "@apollo/client";
import { useStore } from "@mobx/rootStore-context";
import { Comment, TodoCreateCommentDto } from "@type/models/comment";
import style from "./CommentsInput.module.scss";

export const CommentsInput = () => {
    const { todoStore } = useStore();
    const [value, setValue] = useState("");
    const [createComment] = useMutation(CREATE_COMMENT);
    const [fileUpload] = useMutation(FILE_UPLOAD);

    const sendFile = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] as File;
        
        try {
            const reader = new FileReader();
            reader.onload = async () => {
                const result = reader.result as string;
                const base64String = result.split(',')[1]; 
                const { data } = await fileUpload({
                    variables: {
                        file: base64String,
                        filename: file.name,
                        todoId: todoStore.updatedTodo?.id,
                    },
                });
                todoStore.addUpdatedTodoComment(data.uploadFile);
            };
            reader.readAsDataURL(file);
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
                const { data } = await createComment({
                    variables: {
                        dto: commentDto,
                    },
                });
                todoStore.addUpdatedTodoComment(data.createComment as Comment);
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
