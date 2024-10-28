import { gql } from "@apollo/client";

export const DELETE_TODO = gql`
    mutation DeleteTodo($todoId: Int!) {
        deleteTodo(todoId: $todoId)
    }
`;
