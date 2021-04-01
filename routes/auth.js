const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");


// @route      GET api/auth
// @desc       Get logged in user 
// @access     Private
router.get("/", auth, async (req, res) => {
  try {
    
    const user = await User.findById(req.user.id).select("-password");

    // if(user.userType == "admin") {
    //   res.json("admin login");
    //   res.json("employee login") 
    // } else if(user.userType == "employee") {
    //   res.json("employee login") 
    // } else {
    //   res.json("customer login")
    // }

    res.json(user);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error")
  }

});

// @route      POST api/auth
// @desc       Auth user and get token 
// @access     Public
router.post("/", [
  check("email", "please include a valid email").isEmail(),
  check("password", "Password is required").exists()
], async (req, res) => {

  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {email, password} = req.body;

  try {
    
    let user = await User.findOne({ email });

    // if a user is not found with a given password
    if(!user) { 
      return res.status(400).json({msg: "invalid Credentials"});
    }

    // returns true or false on comparion
    const isMatch = await bcrypt.compare(password, user.password);

    // if password doesn't match
    if(!isMatch) {
      return res.status(400).json({msg: "Invalid Credentials"})
    }

    // if password matched

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(payload, config.get("jwtSecret"), { 
      expiresIn: 3600
      }, (err, token) => {
        if(err) throw err;
        res.json({ token });
      }
    )

  } catch(error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }

});




module.exports = router;
