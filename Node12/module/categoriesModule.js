const mongoose = require("mongoose");
const Joi = require("joi");


const categoriesSchema= new mongoose.Schema({
    name:String,
    active: Boolean,

}) 
const categories = new mongoose.model('categories', categoriesSchema)

function validateCategory(category){
    const Schema = Joi.object({
        name : Joi.string.min(5).required(),
        active: Joi.boolean(),
    })
    return Schema.validate(category)
}


async function createCategory(name){
    const category = await new categories({
        name,
        active
    }) .save();
    console.log(category)
}

//createCategory("Sports")
module.exports.categories = categories;
module.exports.categoriesSchema = categoriesSchema;
module.exports.validateCategory = validateCategory; 