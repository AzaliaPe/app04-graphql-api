import graphql from 'graphql';
import ProductGroupType from './ProductGroupType.js';
import ProductGroup from '../models/ProductGroup.js';

const {GraphQLID, GraphQLString, GraphQLObjectType} = graphql;

const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: ()=>({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        price: {type: GraphQLString},
        productGroup: {
            type: ProductGroupType,
            resolve(parent, args){
                return ProductGroup.findById(parent.productGroupId);
            }
        }
    })
});

export default ProductType;