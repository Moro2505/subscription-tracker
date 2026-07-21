import mongoose from "mongoose";
import dayjs from 'dayjs';

const subscriptionSchema = new mongoose.Schema({
    name : {
        type : String ,
        required :[true , 'subscribtion name is required'] ,
        trim : true ,
        minLength : 2 ,
        maxLength : 100 ,
    },
    price : {
        type : Number ,
        required :[true , 'subscribtion price is required'] ,
        min : [0 , 'subscribtion price must be greater than 0'],
    },
    currency : {
        type : String ,
        enum : ['USD' , 'EUR' , 'GPB'] ,
        default : 'USD'
    },
    frequency : {
        type : String ,
        enum : ['daily' , 'weekly' , 'monthly' , 'yearly'] ,
    },
    category : {
        type : String,
        enum : ['sports', 'news', 'entertainment', 'lifestyle', 'technology', 'finance', 'politics', 'other'] ,
        required : true ,
    },
    paymentMethod : {
        type : String ,
        required : true ,
        trim : true , 
    },
    status: {
        type : String ,
        enum : ['active', 'cancelled', 'expired'] ,
        default : 'active' ,
    },
    startDate: {
        type: Date,
        required : true,
        validate : {
            validator : (value) => value <= new Date(),
            message : 'Start date must be in the past',
        }
    },
    renewalDate: {
        type: Date ,
        validate : {
            validator : function (value) {
            return value > this.startDate ;
        },
        message : 'Renewal date must be after the start date',
        }
    },
    user : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'User' ,
        required : true ,
        index : true ,
    },
},{timestamps :true})

subscriptionSchema.pre('save', function () {
const freqMap = {
    daily: 'day',
    weekly: 'week',
    monthly: 'month',
    yearly: 'year',
};

if (!this.renewalDate) {
    const unit = freqMap[this.frequency] || 'month';
    this.renewalDate = dayjs(this.startDate).add(1, unit).toDate();
}

if (dayjs(this.renewalDate).isBefore(dayjs())) {
        this.status = 'expired';
}
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;