import { TODO_ITEM_FRAGMENT } from "@api/fragments";
import { gql } from "@apollo/client";

export const UPDATE_TODO = gql`
    ${TODO_ITEM_FRAGMENT}
    mutation UpdateTodo($dto: TodoUpdateDto!) {
        updateTodo(todoDto: $dto) {
            ...TodoFields
        }
    }
`;
