import mongoose from 'mongoose';

const {Schema} = mongoose;

const SaleSchema = new Schema({
    productId: String,
    orderId: String,
    timeStamp: Date //Es importante saberlo porque por lo general sirve para los reclamos.
});

export default mongoose.model('Sale', SaleSchema);