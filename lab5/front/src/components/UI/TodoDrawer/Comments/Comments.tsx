import { CommentsInput } from "@components/UI/Inputs/CommentsInput/CommentsInput";
import { Chip, Divider } from "@mui/material";
import { Comment as Message } from "@type/models/comment";
import { FC } from "react";
import { Comment } from "./Comment/Comment";
import style from "./Comments.module.scss";

type CommentsProps = {
    comments: Message[];
    username: string;
};

export const Comments: FC<CommentsProps> = ({ comments, username }) => {
    return (
        <div className={style.comments}>
            <Divider>
                <Chip label="Comments" size="small" />
            </Divider>
            {comments.map((comment) => (
                <Comment comment={comment} username={username} key={Math.random()} />
            ))}

            <CommentsInput />
        </div>
    );
};
