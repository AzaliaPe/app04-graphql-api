import graphql from 'graphql';
import database from '../database.js';
import Product from '../models/Product.js';
import ProductGroup from '../models/ProductGroup.js';

const {products, productGroups} = database;

const {GraphQLID, GraphQLString, GraphQLObjectType, GraphQLSchema, GraphQLList} = graphql;

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
                return Product.find({productGroupId: args.id});
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
        }
    }
});

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

                const update = args;
                delete update.id;
                
                const product = Product.findOneAndUpdate({id: args.id}, update);

                return product;
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
        }
    }
});

export default new GraphQLSchema({
    query: RootQueryType,
    mutation: MutationType
});