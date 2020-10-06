import graphql from 'graphql';
import database from '../database.js';

const {products, productType} = database;

const {GraphQLID, GraphQLString, GraphQLObjectType, GraphQLSchema} = graphql;

const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        price: {type: GraphQLString},
        productGroupId: {type: GraphQLID}
    })
});

const RootQueryType = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        //Esto es una consulta
        product: {//Se obtiene por el ID
            type: ProductType, //El tipo de lo que va a devolver
            args: {id: {type: GraphQLID}}, 
            resolve(parent, args){ //Aquí esta cachando los argumentos
                return products.find(p => p.id === args.id); 
            }
        }
        //Aquí termina la consulta de obtener un producto por id
    }
});

export default new GraphQLSchema({
    query: RootQueryType
});