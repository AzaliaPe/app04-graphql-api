import graphql from 'graphql';

import RootQueryType from './RootQueryType.js';
import MutationType from './MutationType.js';

const {GraphQLSchema} = graphql;

export default new GraphQLSchema({
    query: RootQueryType,
    mutation: MutationType
});