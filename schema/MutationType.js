import graphql from 'graphql';
import Product from '../models/Product.js';
import ProductGroup from '../models/ProductGroup.js';

import ProductGroupType from './ProductGroupType.js';
import ProductType from './ProductType.js';
import UserType from './UserType.js';
import AddressType from './AddressType.js';
import User from '../models/User.js';
import Address from '../models/Address.js';
import OrderType from './OrderType.js';
import Order from '../models/Order.js';
import SaleType from './SaleType.js';
import Sale from '../models/Sale.js';

const {GraphQLID, GraphQLString, GraphQLFloat,GraphQLObjectType} = graphql;


const MutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        //Product
        addProduct: {
            type: ProductType,
            args: {
                name: {type: GraphQLString},
                price: {type: GraphQLFloat},
                productGroupId: {type: GraphQLID}
            },
            resolve(parent, args){
                let product = new Product(args);
                return product.save();
            }
        },
        editProduct: {
            type: ProductType,
            args:{
                id: {type: GraphQLID},
                name: {type: GraphQLString},
                price: {type: GraphQLFloat},
                productGroupId: {type: GraphQLID}
            },
            resolve(parent, args){

                return Product.findByIdAndUpdate(args.id, args);
            }
        },
        deleteProduct: {
            type: ProductType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return Product.findByIdAndRemove(args.id);
            }
        },
        //ProductGroup
        addProductGroup: {
            type: ProductGroupType,
            args: {
                name: {type: GraphQLString}
            },
            resolve(parent, args){
                const productGroup = new ProductGroup(args);
                return productGroup.save();
            }
        },
        editProductGroupId: {
            type: ProductGroupType,
            args: {
                id: {type: GraphQLID},
                name: {type: GraphQLString}
            },
            resolve(parent, args){

                return ProductGroup.findByIdAndUpdate(args.id, args);
            }
        },
        deleteProductGroupId: {
            type: ProductGroupType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return ProductGroup.findByIdAndRemove(args.id);
            }
        },
        //User
        addUser: {
            type: UserType,
            args: {
                firstName: {type: GraphQLString},
                secondName: {type: GraphQLString},
                phoneNumber: {type: GraphQLString},
                birthDay: {type: GraphQLString},
                email: {type: GraphQLString},
                addressId: {type: GraphQLID}
            },
            resolve(parent, args){
                const user = new User(args);
                return user.save();
            }
        },
        //Address
        addAddress: {
            type: AddressType,
            args: {
                streetName: {type: GraphQLString},
                city: {type: GraphQLString},
                cpNumber: {type: GraphQLString},
                userId: {type: GraphQLID}
            },
            resolve(parent, args){
                const address = new Address(args);
                return address.save();
            }
        },
        //Orders
        addOrder: {
            type: OrderType,
            args:{userId: {type: GraphQLID}},
            resolve(parent, args){
                const order = new Order(args);
                return order.save();
            }
        },
        //Sales
        addSale: {
            type: SaleType,
            args: {
                productId: {type: GraphQLID},
                orderId: {type: GraphQLID},
                timeStamp: {type: GraphQLString}
            },
            resolve(parent, args){
                const sale = new Sale(args);
                return sale.save();
            }
        }
    }
});

export default MutationType;