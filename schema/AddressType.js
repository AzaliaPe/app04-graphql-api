import graphql from 'graphql';
import User from '../models/User.js';
import UserType from './UserType.js';

const {GraphQLID, GraphQLString, GraphQLObjectType} = graphql;

const AddressType = new GraphQLObjectType({
    name: 'Address',
    fields: ()=>({
        id: {type: GraphQLID},
        streetName: {type: GraphQLString},
        city: {type: GraphQLString},
        cpNumber: {type: GraphQLString},
        user: {
            type: UserType,
            resolve(parent, args){
                return User.findById(parent.userId);
            }
        }
    })
});

export default AddressType;
