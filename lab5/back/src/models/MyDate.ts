import { Kind } from 'graphql';

const { GraphQLScalarType } = require('graphql');

export const MyDateTime = new GraphQLScalarType({
    name: 'MyDateTime',
    description: 'A valid date-time value',
    serialize(value) {
        return value;
    },
    parseValue(value) {
        return value;
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.STRING) {
            return new Date(ast.value);
        }
        return null;
    },
});
