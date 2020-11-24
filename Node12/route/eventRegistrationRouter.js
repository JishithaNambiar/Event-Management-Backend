const express = require("express");
const router = express.Router();
const {registration, validateUser} = require('../module/eventRegistration')
const {customer} = require('../module/customerModule')
const {Event} = require("../module/eventModule")

router.get("/", async (req, res) => {
    const Registrations = await registration.find();
    res.send(registrations);
  });
  router.get("/:id", async (req, res) => {
    const Registration = await registration.findById(req.params.id);
    if (!Registration)
      return res
        .status(404)
        .send("The customer with the given ID was not found.");
    res.send(Registration);
  });
  router.post("/", async(req, res)=>{
    console.log(req.body.amount);
    const { error } = Validate(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    const Customer = await customer.findById(req.body.customerId)
    if(!Customer) return res
    .status(404)
    .send("The customer with the given ID was not found.");

    const event = await Event.findById(req.body.eventId)
    if(!event) return res
    .status(404)
    .send("The event with the given ID was not found.");

    let Registration = new registration({
        customer:{
            _id:Customer._id,
            name: Customer.name,
            isMember:Customer.isMember,
            phoneNumber: Customer.phoneNumber

        },
        event:{
            _id:event._id,
            EventName:event.EventName
        },
        amount:req.body.amount,       
    })

    Registration = await Registration.save(),
    res.send(Registration);
  })

  module.exports= router