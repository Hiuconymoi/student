var mongoose=require('mongoose')
var UserSchema=mongoose.Schema({
    user:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    }
})

var UserModel=mongoose.model('user',UserSchema,'user');
module.exports = UserModel;