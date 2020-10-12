import mongoose from 'mongoose';

const {Schema} = mongoose;

const ProductSchema = new Schema({
    name: String,
    price: String,
    productGroupId: String
});

export default mongoose.model('Product', ProductSchema);