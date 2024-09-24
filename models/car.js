const mongoose = require('mongoose');
const Schema= mongoose.Schema;

const carSchema= new Schema ({
    märke: String,
    modell: String,
    car_id: String,
    year_modell: Number,
    drivmedel: String,
    price: Number,
    hästkraft: Number,
    kaross: String,
    available: Boolean,
    isLiked: {
        type: Boolean,
        default: false
    },
    picture: {
        type: [String],
        default: []   
    }

})


const Car= mongoose.model('Car', carSchema);
module.exports= Car;



//  BIL =>              märke => model => => års model => car_id => drivmedel => price => pic (kanske list) => hästkraft => isLiked => kaross => available
// USER =>              id => name => email => guest (boolean) =>  log in datum (date)=> sparade (listor)
// köp hantering =>     hela car object , hela user objekt , datum start, datum end , rentID, price 
