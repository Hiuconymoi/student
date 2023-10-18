var mongoose=require('mongoose');
var PlaneSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Cannot be empty"]
    },
    material:{
        type:String,
        required:true
    },
    color:String,
    price:Number,
    description:String,
    image:String,
})

var PlaneModel=mongoose.model('plane',PlaneSchema,'plane');
module.exports = PlaneModel;