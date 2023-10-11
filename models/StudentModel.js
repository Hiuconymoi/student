var mongoose=require('mongoose')
var StudentSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name can not be empty"]
    },

    dob:Date,
    gender:{
        type:String,
        enum:["Male","Female"],
    },
    gpa:{
        type:Number,
        min:[0,"Gpa cannot be negative"],
        max:10
    },
    image:String,
})

var StudentModel=mongoose.model("student",StudentSchema,"student");
module.exports = StudentModel;