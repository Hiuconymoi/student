var mongoose=require('mongoose');
var FigureSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Cannot be empty"]
    },
    material:{
        type:String,
        required:true
    },
    height:String,
    price:Number,
    description:String,
    image:String,
})

var FigureModel=mongoose.model('figure',FigureSchema,'figure');
module.exports = FigureModel;