const {categories, validateCategories} = require('../module/categoriesModule');
const express = require ("express");
const router = express.Router();
const Joi = require ("joi");
const bcrypt = require('bcrypt');
const mongoose = require("mongoose")


router.get('/', async(req,res)=>{
    const Categories = await categories.find();
    if(!Categories) return res.send("no data found")
    res.send(Categories)
});

router.get('/:id', async(req,res)=>{
    const Categories = await categories.findById(req.params.id);
    if(!Categories) return res.status(400).send("Categories with given Id not found")
    res.send(Categories)
});

router.post("/", async(req, res) => {

    const {error} = validateCategories(req.body)
    if (error) return res.send(error.details[0].message)

    let Categories = new categories({
        name: req.body.name,
        active: req.body.active,
    });

     const Categories = await categories.save()
     return Categories
})

router.put("/:id", async(req,res) => {
    console.log(req.body);
  const { error } = validateCategories(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const Categories = await categories.findByIdAndUpdate(
      req.params.id, {
          $set :{
            name: req.body.name,
        active: req.body.active,
          },
      },
      {new:true}
  );
  if (!Categories)
    return res
      .status(404)
      .send("The Categories with the given ID was not found.");

  res.send(Categories);
});

router.delete("/:id", async (req, res) => {
    const Categories = await categories.findByIdAndRemove(req.params.id);
    if (!Categories)
      return res
        .status(404)
        .send("The Categories with the given ID was not found.");
    res.send(Categories);
  });
  
  module.exports = router;
