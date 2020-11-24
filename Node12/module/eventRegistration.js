const mongoose = require("mongoose");
const Joi = require("joi");

const registration = mongoose.model("Registration", mongoose.Schema({
    customer:{
        type: new mongoose.Schema({
            name:{
                type: String,
                required: true,
                minlength: 3,
                maxlength:50,
            },

            isMember:{
                type: Boolean,
                default:false,
            },

            phoneNumber:{
                type:String,
                required: true,
                minlength:5,
                maxlength:50
            }
        }),
        required:true,

    },

    event: {
        type: new mongoose.Schema({
            EventName: {
                type:String,
                require: true,
                trim:true,
                minlength:5,
                maxlength:50,
            }
        }),
        required:true,
    },

    dateCreated:{
        type: new mongoose.Schema({
            type: Date,
            default: Date.now,
            required: true,
        })
    },

    amount: {
        type: new mongoose.Schema({
            type:Number,
            required: true,
            max: 500,
            min:0,
        })
    }


}))


function validateUser(user){
    const schema = Joi.object({
        customerId: Joi.string().required(),
        eventId:Joi.string().required(),
        amount: Joi.number().min(0).max(500).required()
    })
    return schema.validate(user);
}

module.exports.registration = registration
module.exports.validateUser = validateUser