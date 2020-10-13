import mongoose from 'mongoose';

const {Schema} = mongoose;

const ProductSGroupchema = new Schema({
    name: String
});

export default mongoose.model('ProductGroup', ProductSGroupchema);