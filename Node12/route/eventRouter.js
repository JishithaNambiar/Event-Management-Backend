const express = require('express');
const router = express.Router();
const {Event, validateEvent} = require('../module/eventModule');
const{categories} = require('../module/eventModule');
const auth = require('../middleware/auth');
const admin =  require('../middleware/admin')

router.get('/events/:id', async(req,res) => {

    const schema = await Event.findById(req.params.id)
    if(!schema)
    return res.status(400).send("the event id was not found")
    res.send(schema);
})

router.get('/events', async(req,res) => {

const schema = await Event.find()
if(!schema)
return res.status(400).send("schema not found")
res.send(schema);

})

router.post("/", async(req,res) => {
const {error} = validateEvent(req.body)
if (error) return res.status(404).send(error.details[0].message);

const category = await categories.findById(req.body.categoryid)
let event = new Event({
  Title: req.body.Title,
  categories:{
    _id: category._id,
    name: category.name

  },
        NumberOfTicketsAvailable: req.body.NumberOfTicketsAvailable,
        Price:req.body.Price,  
        Active: req.body.Active

})

 event = await event.save(),
res.send(event);

});



router.put("/:id", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);
  const category = await categories.findById(req.body.categoryId);
  const event = await Event.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        Title: req.body.Title,
        Active: req.body.Active,
        Price: req.body.Price,
        NumberOfTicketsAvailable: req.body.NumberOfTicketsAvailable,
        categories:{
          _id: category._id,
          name: category.name
      
        },
      },
    },
    { new: true }
  );
  if (!event)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  res.send(event);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  console.log("hi");
  const event = await Event.findByIdAndRemove(req.params.id);
  if (!event)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");
  res.send(event);
});

module.exports = router;