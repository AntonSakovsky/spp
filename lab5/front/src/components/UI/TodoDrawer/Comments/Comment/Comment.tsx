import { Avatar } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { FC } from "react";

import { DOWNLOAD_FILE } from "@api/query/downloadFile";
import { useQuery } from "@apollo/client";
import { Comment as Message } from "@type/models/comment";
import style from "./Comment.module.scss";

type CommentProps = {
    comment: Message;
    username: string;
};

export const Comment: FC<CommentProps> = ({ comment, username }) => {
    const { refetch } = useQuery(DOWNLOAD_FILE, {
        skip: true,
    });
    const downloadFile = async () => {
        await refetch({
            filename: comment.filename,
        });
    };

    return (
        <div className={style.comment}>
            <div className={style.user}>
                <Avatar sx={{ bgcolor: deepPurple[400] }} className={style.avatar}>
                    {username.charAt(0)}
                </Avatar>
                <h4 className={style.userName}>Anton</h4>
            </div>
            {comment.message && <p className={style.message}>{comment.message}</p>}
            {comment.filename && (
                <a
                    href={`file/${comment.filename}`}
                    download={comment.filename}
                    className={style.message}
                    onClick={downloadFile}
                >
                    {comment.filename}
                </a>
            )}
        </div>
    );
};
