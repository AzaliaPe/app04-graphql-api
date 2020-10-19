import mongoose from 'mongoose';

const {Schema} = mongoose;

const OrderSchema = new Schema({
    userId: String,
});

export default mongoose.model('Order', OrderSchema);