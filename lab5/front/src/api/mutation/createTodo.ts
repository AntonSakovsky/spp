import { TODO_ITEM_FRAGMENT } from "@api/fragments";
import { gql } from "@apollo/client";

export const CREATE_TODO = gql`
    ${TODO_ITEM_FRAGMENT}
    mutation CreateTodo($dto: TodoCreateDto!) {
        createTodo(todoDto: $dto) {
            ...TodoFields
        }
    }
`;
