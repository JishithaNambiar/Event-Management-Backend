const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const {categories,validateCategory} = require("../module/categoriesModule");


router.get("/", async (req, res) => {
    const Categories = await categories.find();
    res.send( Categories);
  });
  router.get("/:id", async (req, res) => {
    const  Categories = await categories.findById(req.params.id);
    if (! Categories)
      return res
        .status(404)
        .send("The customer with the given ID was not found.");
    res.send( Categories);
  });

  router.post("/", auth, async(req,res)=>{
    console.log(req.body);
    const { error } = validateCategory(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    let category = new categories({
        name:req.body.name,
        active: req.body.active,
    })

    const category = await category.save();
    res.send(category);
  })

  router.put("/:id", async (req,res)=>{
    const { error } = validate(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    const category = await categories.findByIdAndUpdate(
        req.params.id,
        {
            $set:{
                name:req.body.name,
                active:req.body.active
            }
        },
        {new:true});

        if(!category) return res
        .status(404)
        .send("The customer with the given ID was not found.");
  
    res.send(category);
  })


  router.delete("/:id", [auth, admin], async (req, res) => {
    const Category = await categories.findByIdAndRemove(req.params.id);
    if (!Category)
      return res
        .status(404)
        .send("The customer with the given ID was not found.");
    res.send(Category);
  });
  
  module.exports = router;