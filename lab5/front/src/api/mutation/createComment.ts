import { TODO_ITEM_FRAGMENT } from "@api/fragments";
import { gql } from "@apollo/client";

export const CREATE_COMMENT = gql`
    ${TODO_ITEM_FRAGMENT}
    mutation CreateComment($dto: CommentCreateDto!) {
        createComment(commentDto: $dto) {
            id
            filename
            filepath
            message
            user {
                id
                username
            }
            todo {
                ...TodoFields
            }
        }
    }
`;
