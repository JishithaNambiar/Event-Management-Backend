const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

const {user, validateUser} = require('../module/userModule')

router.get("/", async (req, res) => {
    const users = await user.find();
    res.send(users);
  });
router.get("/:id", async (req, res) => {
    const user = await user.findById(req.params.id);
    if (!user)
      return res
        .status(404)
        .send("The customer with the given ID was not found.");
    res.send(user);
  });

router.get("/", auth, async (req, res) => {
    const user = await user.findById(req.user._id).select("-password");
    res.send(user);
  });
  
router.post("/",auth, async(res,req)=>{
    console.log(req.body);
    const { error } = validate(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    const email = await user.findOne({email:req.body.email})
    if (email) if (email) return res.status(400).send("user email already exits")

    let User = new user({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
     
     const salt = await bcrypt.genSalt(10);
     User.password = await bcrypt.hash(User.password, salt);
     const User = await User.save();

     const token = User.generateAuthToken();
     res
     .header("x-auth-token", token)
     .header("access-control-expose-headers", "x-auth-token")
     .send(User);

  })

  router.put("/:id", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(404).send(error.details[0].message);
  
    const User = await user.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        },
      },
      { new: true }
    );
    if (!User)
      return res
        .status(404)
        .send("The customer with the given ID was not found.");
  
    res.send(User);
  });
  
  router.delete("/:id", async (req, res) => {
    const User = await user.findByIdAndRemove(req.params.id);
    if (!User)
      return res
        .status(404)
        .send("The customer with the given ID was not found.");
    res.send(User);
  });
  
  module.exports = router;