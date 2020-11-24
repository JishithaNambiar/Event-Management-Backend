const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config  = require("config");
const uniqueValidator = require("mongoose-unique-validator")

const userSchema = new mongoose.Schema({
    name:{
        type: String, 
        unique: true,
        required: true,
        minlength:5,
        maxlenght:500
    },
    email: {
        type: String,
        unique:true,
        required:true,
        minlength: 5,
        maxlength:255,
    },
    password: {
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    },
    isAdmin: Boolean,
})
const user = mongoose.model("user", userSchema)

function validateUser(users){
    const Schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required(),
        password: Joi.string().min(5).max(1024).required(),
      });
      return schema.validate(users);
}


userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({
        _id: this._id,
        isAdmin: this.isAdmin,
        email:this.email,
        name:this.name,
    },
    config.get("jwtPrivateKey")
    );

    return token;
}


userSchema.plugin(uniqueValidator,{message: 'is already taken'});
module.exports.user = user;
modul.exports.validateUser = validateUser;