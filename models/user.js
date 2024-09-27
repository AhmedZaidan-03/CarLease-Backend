const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const userSchema= new Schema({
    user_id: String,
    name: String,
    password: String,
    email: {
        type: String,
        unique: true,
    },
    favorites: {
        type: [String],
        default: [],
    }

}, {timestamps: true})


const User= mongoose.model("user", userSchema);
module.exports= User;