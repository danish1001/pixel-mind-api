const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

// ------------------------- CREATE NEW USERS BY POST REQUEST --------------------------------------

// @route      POST api/users ( Admin, employee, customer )
// @desc       Register a user ( Admin, employee, customer ) 
// @access     Public
router.post("/", [
  check("name", "name is required").not().isEmpty(),
  check("email", "please include a valid email").isEmail(),
  check("password", "Please enter a password with 6 or more characters").isLength({ min: 6 }),
  check("userType", "userType i.e. Admin, employee, customer is required").not().isEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const {name, email, password, userType} = req.body;

  try {

    let user = await User.findOne({email: email});

    if(user) {
      return res.status(400).json({msg: "User Already exists"});
    }

    user = new User({
      name: name,
      email: email,
      password: password,
      userType: userType
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {        // creating payload for jwt
      user: {
        id: user.id
      }
    }

    jwt.sign(payload, config.get("jwtSecret"), {  // payload, secret, options
      expiresIn: 3600
    }, (err, token) => {
      if(err) throw err;

      console.log(token);

      if(user.userType == "admin") {
        // redirect to blog
      } else if(user.userType == "employee") {
        res.json("employee login"); 
      } else {
        res.json("customer login");
      }

    });


  } catch (err) {
    console.log(err.massage);
    res.status(500).send("Server Error")
  }

});



module.exports = router;
