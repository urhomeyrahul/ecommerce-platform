const mongoose = require("mongoose");

const productSchema = mongoose.Schema({

    name:{type:String, required:true},
    price:{type:Number, required:true},
    description:{type:String, required:true},
    stock:{default:0, type:Number},
    category:{type:String},

})

module.exports = mongoose.model('product', productSchema);