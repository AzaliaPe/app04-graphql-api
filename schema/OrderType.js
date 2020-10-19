import graphql from 'graphql';
import User from '../models/User.js';
import UserType from './UserType.js';
import Sale from '../models/Sale.js';
import SaleType from './SaleType.js';
import Product from '../models/Product.js';

const {GraphQLID, GraphQLString, GraphQLList, GraphQLFloat, GraphQLObjectType} = graphql;

const OrderType = new GraphQLObjectType({
    name: 'Order',
    fields: ()=>({
        id: {type: GraphQLID},
        user: {
            type: UserType,
            resolve(parent, args){
                return User.findById(parent.userId);
            }
        },
        sales: {
            type: new GraphQLList(SaleType),
            resolve(parent, args){
                return Sale.find({orderId: parent.id});
            }
        },
        total: {
            type: GraphQLFloat,
            resolve(parent, args){
                const sales = Sale.find({orderId: parent.id});
                const products = sales.map(sale => Product.findById(sale.productId));
                const prices = products.map(product => product.price);
                return prices.reduce((totalPrices, price) => totalPrices + price);
            }
        }
    })
});

export default OrderType;