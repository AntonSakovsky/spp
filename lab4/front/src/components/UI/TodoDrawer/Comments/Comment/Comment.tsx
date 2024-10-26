import { Avatar } from "@mui/material";
import { deepPurple, yellow } from "@mui/material/colors";
import cn from "classnames";
import { FC } from "react";

import { useWebSocket } from "@context/WebsocketContext";
import { TodoService } from "@services/TodoService";
import { Comment as Message } from "@type/models/comment";
import style from "./Comment.module.scss";

type CommentProps = {
    comment: Message;
    username: string;
};

export const Comment: FC<CommentProps> = ({ comment, username }) => {
    const { socket } = useWebSocket();

    const download = () => {
        TodoService.download(socket, comment.filename as string);
        socket?.on("downloadFile", () => {
            console.log("object");
        });
    };

    const isMyComment = username === comment.user.username;

    return (
        <div className={cn(style.comment, { [style.inverse]: !isMyComment })}>
            <div className={cn(style.user, { [style.inverse]: !isMyComment })}>
                <Avatar
                    sx={{ bgcolor: isMyComment ? deepPurple[400] : yellow["800"] }}
                    className={style.avatar}
                >
                    {comment.user.username.charAt(0)}
                </Avatar>
                <h4 className={style.userName}>{comment.user.username}</h4>
            </div>
            <div className={cn(style.messageBlock, { [style.inverse]: !isMyComment })}>
                {comment.message && <p className={style.message}>{comment.message}</p>}
                {comment.filename && (
                    <p className={style.message}>
                        <a
                            href={`file/${comment.filename}`}
                            download={comment.filename}
                            onClick={download}
                        >
                            {comment.filename}
                        </a>
                    </p>
                )}
            </div>
        </div>
    );
};
