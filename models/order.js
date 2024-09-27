const mongoose= require('mongoose');
const Schema= mongoose.Schema;

const orderSchema= new Schema ({
    name: String,
    email: String,
    car_märke: String,
    car_model: String,
    price: Number,
    start_date: Date,
    end_date: Date,
    rent_id: String
}, {timestamps: true})

const Order= mongoose.model("order", orderSchema);
module.exports= Order;
