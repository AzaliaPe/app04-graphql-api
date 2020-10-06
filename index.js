import express from 'express';
import expressGraphql from 'express-graphql';
import Scheme from './scheme/Scheme.js';

const {graphqlHTTP} = expressGraphql;

const port = 5000;

const app = express();

app.use('/graphql', graphqlHTTP({
    schema: Scheme,
    graphiql: true
}));

app.listen(port, console.log(`listening at: http://localhost:${port}/graphql`));