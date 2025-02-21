import mongoose from 'mongoose';

const EndUserSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
    },
    email: {
        type:String,
        required:true,
    },
    password: {
        type:String,
        required: true,
    },
});

const EndUser = mongoose.model('EndUser', EndUserSchema);

export default EndUser;