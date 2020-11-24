const express = require ("express");
const router = express.Router();
const Joi = require ("joi");
const bcrypt = require('bcrypt');
const {user} = require('../module/userModule')


//to verify the if the jwt is valid or not and if valid only then changes c
//changes can be made


router.post('/', async(req,res) => {
    console.log(req.body);
    const {error} = validateAuth(req.body)
    if(error) return res.status(404).send(error.details[0].message);

    let User = await user.findOne({email: req.body.email});
    if(!User) return res.status(400).send("Invalid Email or Password")
    const validPassword= await bcrypt.compareSync(req.body.password, user.password);
    if(!validPassword) return res.status(400).send("Invalid Email or password")
    const token = user.generateAuthToken();
    res.send(token);
})

function validateAuth(users){
    const Schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password = Joi.string().min(5).max(1024).required().password()
    })
    return Schema.validate(users)
}

module.exports = router;