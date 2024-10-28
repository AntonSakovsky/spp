import { gql } from "@apollo/client";
import { TODO_ITEM_FRAGMENT } from '../fragments';

export const GET_ALL_TODOS = gql`
    ${TODO_ITEM_FRAGMENT}
    query GetAllTodos {
        allTodos {
            ... TodoFields
        }
    }
`;
