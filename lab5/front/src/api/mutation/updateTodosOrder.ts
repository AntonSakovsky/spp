import { gql } from "@apollo/client";

export const UPDATE_TODOS_ORDER = gql`
    mutation UpdateTodosOrder($dto: [UpdateTodosOrderDto!]!) {
        updateTodosOrder(todosDto: $dto)
    }
`;
