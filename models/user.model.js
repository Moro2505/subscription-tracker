import Subscription from './subscription.model.js';
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type : String ,
        required : [true , 'user name is required'] ,
        trim : true ,
        minLength : 2 ,
        maxLength : 50,
    },
    email : {
        type : String ,
        required : [true , 'user email is required'] ,
        trim : true ,
        unique : true ,
        lowercase : true ,
        match : [/\S+@\S+\.\S+/, 'Please fill a valid email address'],
    },
    password : {
        type : String ,
        required : [true , 'user password is required'] ,
        minLength : 6 ,
    },},
    {timestamps : true,});

userSchema.pre('findOneAndDelete', async function () {
try {
    const userId = this.getQuery()._id;
    await Subscription.deleteMany({ user: userId });
} catch (error) {
    next(error);
}
});

const User = mongoose.model('User', userSchema);
export default User;

