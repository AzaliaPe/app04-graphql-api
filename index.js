import express from 'express';
import expressGraphql from 'express-graphql';
import Scheme from './scheme/Scheme.js';
import mongoose from 'mongoose';

const {graphqlHTTP} = expressGraphql;

const port = 5000;

const app = express();

const dbName = 'tacos-db';
const user = 'admin';
const password = 'tacos27ricos';
const connectionString = `mongodb+srv://${user}:${password}@clustertacos.y89nv.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true})
.then(console.log('connected to tacos-db'))
.catch(error => console.log(`[Error]: ${error}`));

app.use('/graphql', graphqlHTTP({
    schema: Scheme,
    graphiql: true
}));

app.listen(port, console.log(`listening at: http://localhost:${port}/graphql`));