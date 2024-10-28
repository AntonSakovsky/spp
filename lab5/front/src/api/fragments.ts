import { gql } from "@apollo/client";

export const TODO_ITEM_FRAGMENT = gql`
    fragment TodoFields on TodoModel {
        id
        task
        status
        order
        deadline
        comments {
            id
            filename
            filepath
            message
            user {
                id
                username
            }
        }
        creator {
            id
            username
        }
    }
`;
