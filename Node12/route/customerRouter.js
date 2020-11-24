const {customer, validateCustomer} = require('../module/customerModule');
const express = require ("express");
const router = express.Router();
const Joi = require ("joi");
const bcrypt = require('bcrypt');
const mongoose = require("mongoose")


router.get('/', async(req,res)=>{
    const Customer = await customer.find();
    if(!Customer) return res.send("no data found")
    res.send(Customer)
});

router.get('/:id', async(req,res)=>{
    const Customer = await customer.findById(req.params.id);
    if(!Customer) return res.status(400).send("customer with given Id not found")
    res.send(Customer)
});

router.post("/", async(req, res) => {

    const {error} = validateCustomer(req.body)
    if (error) return res.send(error.details[0].message)

    let Customer = new customer({
        name: req.body.name,
        isMember: req.body.isMember,
        phoneNumber: req.body.phoneNumber

    });

     const Customer = await customer.save()
     return Customer
})

router.put("/:id", async(req,res) => {
    console.log(req.body);
  const { error } = validateCustomer(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const Customer = await customer.findByIdAndUpdate(
      req.params.id, {
          $set :{
            name: req.body.name,
            isMember: req.body.isMember,
            phoneNumber: req.body.phoneNumber
          },
      },
      {new:true}
  );
  if (!Customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  res.send(Customer);
});

router.delete("/:id", async (req, res) => {
    const Customer = await customer.findByIdAndRemove(req.params.id);
    if (!Customer)
      return res
        .status(404)
        .send("The customer with the given ID was not found.");
    res.send(Customer);
  });
  
  module.exports = router;
