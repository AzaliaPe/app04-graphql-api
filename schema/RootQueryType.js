import graphql from 'graphql';

import Product from '../models/Product.js';
import ProductGroup from '../models/ProductGroup.js';
import User from '../models/User.js';
import Address from '../models/Address.js';

import ProductGroupType from './ProductGroupType.js';
import ProductType from './ProductType.js';
import UserType from './UserType.js';
import AddressType from './AddressType.js';

import OrderType from './OrderType.js';
import Order from '../models/Order.js';

const {GraphQLID, GraphQLObjectType, GraphQLList} = graphql;

const RootQueryType = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        //Esto es una consulta
        product: {//Se obtiene por el ID
            type: ProductType,//El tipo de lo que va a devolver
            args: {id: {type: GraphQLID}},
            resolve(parent, args){//Aquí esta cachando los argumentos
                return Product.findById(args.id);
            }
        },//Aquí termina la consulta de obtener un producto por id
        //Obtener la lista de los productos de database
        products: {
            type: new GraphQLList(ProductType),
            resolve(parent, args){//Para hacer una relación se necesita el parent
                return Product.find();
            }
        },
        getProductsByGroupId:{
            type: new GraphQLList(ProductType),
            args: {groupId: {type: GraphQLID}},
            resolve(parent, args){
                return Product.find({productGroupId: args.groupId});
            }
        },
        productGroup: {
            type: ProductGroupType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return ProductGroup.findById(args.id);
            }
        },
        productGroups: {
            type: new GraphQLList(ProductGroupType),
            resolve(parent, args){
                return ProductGroup.find();
            }
        },
        //Users
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args){
                return User.find();
            }
        },
        //Addresses
        addresses: {
            type: new GraphQLList(AddressType),
            resolve(parent, args){
                return AddressType.find();
            }
        },
        //Orders
        order: {
            type: OrderType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return Order.findById(args.id);
            }
        },
        orders: {
            type: new GraphQLList(OrderType),
            resolve(parent, args){
                return Order.find();
            }
        }
    }   
});

export default RootQueryType;