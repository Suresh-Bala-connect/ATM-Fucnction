const mongoose = require('mongoose')
const atm_model = new mongoose.Schema({
    "name": { type: String },
    "password": { type: Number, required: true },
    "balance": { type: Number, required: true },
    "deposit": { type: Number, default: 0 },
    "withdraw": { type: Number, default: 0 },
    "history": { type:Array,default:[] }
    
},)


module.exports = mongoose.model("ATM_Members", atm_model)