import mongoose from 'mongoose';

const {Schema} = mongoose;

const UserSchema = new Schema({
    firstName: String,
    secondName: String,
    phoneNumber: String,
    birthDay: Date,
    email: String,
    addressId: String
});

export default mongoose.model('User', UserSchema);