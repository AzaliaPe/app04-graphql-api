import mongoose from 'mongoose';

const {Schema} = mongoose;

const AddressSchema = new Schema({
    userId: String,
    streetName: String,
    city: String,
    cpNumber: String
});

export default mongoose.model('Address', AddressSchema);