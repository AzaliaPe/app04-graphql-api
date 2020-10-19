import graphql from 'graphql';
import ProductType from './ProductType.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import OrderType from './OrderType.js';

const {GraphQLID, GraphQLString, GraphQLObjectType} = graphql;

const SaleType = new GraphQLObjectType({
    name: 'Sale',
    fields: ()=>({
        id: {type: GraphQLID},
        product: {
            type: ProductType,
            resolve(parent, args){
                return Product.findById(parent.productId);
            }
        },
        order: {
            type: OrderType,
            resolve(parent, args){
                return Order.findById(parent.orderId);
            }
        },
        timeStamp: {type: GraphQLString}
    })
});

export default SaleType;