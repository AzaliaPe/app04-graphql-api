import graphql from 'graphql';
import Address from '../models/Address.js';
import AddressType from './AddressType.js';

const {GraphQLID, GraphQLString, GraphQLObjectType} = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: ()=>({
        id: {type: GraphQLID},
        firstName: {type: GraphQLString},
        secondName: {type: GraphQLString},
        phoneNumber: {type: GraphQLString},
        birthDay: {type: GraphQLString},
        email: {type: GraphQLString},
        address: {
            type: AddressType,
            resolve(parent, args){
                return Address.findById(parent.addressId);
            }
        }
    })
});

export default UserType;
