const mongoose = require('mongoose');
const Joi = require("joi");
const {categoriesSchema} = require("./categoriesModule");

const eventSchema = new mongoose.Schema({
    
    Title: String,
    categories: categoriesSchema,
    NumberOfTicketsAvailable: Number,
    Price: Number,
    Active:Boolean,
    
})
const event = new mongoose.model('event', eventSchema)

async function createEvent(Title,categories,NumberOfTicketsAvailable,Price){
    const events = new event ({
        Title,
        categories,
        NumberOfTicketsAvailable,
        Price,
        Active,
    })
    const result = await events.save();
    console.log(result);
}
//createEvent("Baseball", new categories({name: "Sports"}),5, 50)

function validateEvent(events){
    const Schema = Joi.object( {
        Title: Joi.string().min(5).required(),
        categories:Joi.string().min(3).required(),
        NumberOfTicketsAvailable: Joi.string().required(),
        Price:Joi.string().required(),
        Active:Joi.boolean(),
    })

    return Schema.validate(events)
}

module.exports.Event = event;
module.exports.validateEvent = validateEvent;
