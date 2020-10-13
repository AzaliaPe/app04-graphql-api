import graphql from 'graphql';
import ProductType from './ProductType.js';
import Product from '../models/Product.js';

const {GraphQLID, GraphQLString, GraphQLObjectType, GraphQLList} = graphql;


const ProductGroupType = new GraphQLObjectType({
    name: 'ProductGroup',
    fields: ()=>({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        products: {
            type: new GraphQLList(ProductType),
            resolve(parent, args){
                return Product.find({productGroupId: parent.id});
            }
        }
    })
});

export default ProductGroupType;