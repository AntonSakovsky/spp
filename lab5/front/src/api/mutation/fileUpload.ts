import { TODO_ITEM_FRAGMENT } from "@api/fragments";
import { gql } from "@apollo/client";

export const FILE_UPLOAD = gql`
    ${TODO_ITEM_FRAGMENT}
    mutation UploadFile($file: String!, $filename: String!, $todoId: Int!) {
        uploadFile(file: $file, filename: $filename, todoId: $todoId) {
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
