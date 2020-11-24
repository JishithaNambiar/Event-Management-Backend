const mongoose = require("mongoose");
const Joi = require("joi");

const customer = mongoose.model("customer", 
new mongoose.Schema({
  name:{
      type:String,
      minlength: 5,
      maxlength:50,
      required:true
  },  
  isMember:{
      type:Boolean,
      default:false
  },
  phoneNumber:{
      type:String,
      minlength:5,
      maxlength:50,
      required:true
  }
}))


function validateCustomer(customers){
    const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    isMember: Joi.boolean().required(),
    phoneNumber: Joi.string().min(5).max(50).required(),
    }),
    return schema.validate(customers)
}

modeule.exports.customer = customer,
module.exports.validateCustomer = validateCustomer