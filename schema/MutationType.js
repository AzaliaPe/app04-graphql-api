import graphql from 'graphql';
import Product from '../models/Product.js';
import ProductGroup from '../models/ProductGroup.js';

import ProductGroupType from './ProductGroupType.js';
import ProductType from './ProductType.js';

const {GraphQLID, GraphQLString, GraphQLObjectType} = graphql;

const MutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addProduct: {
            type: ProductType,
            args: {
                name: {type: GraphQLString},
                price: {type: GraphQLString},
                productGroupId: {type: GraphQLID}
            },
            resolve(parent, args){
                let product = new Product(args);
                //products.push(newProduct);

                return product.save();
            }
        },
        editProduct: {
            type: ProductType,
            args:{
                id: {type: GraphQLID},
                name: {type: GraphQLString},
                price: {type: GraphQLString},
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

                return ProductGroup.findByIdAndRemove(args.id, args);
            }
        },
    }
});

export default MutationType;