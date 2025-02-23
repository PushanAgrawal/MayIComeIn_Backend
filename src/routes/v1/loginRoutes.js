const express = require("express");
const loginAuth = require("../../middlewares/authMiddleware");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const Student = require("../../models/student")
const {JWT_SECRET} = require("../../config/server-config")


router.post("/registerStudent",
    [  body('firstName').isString().notEmpty().withMessage('First name is required'),
        body('lastName').isString().notEmpty().withMessage('Last name is required'),
        body('roll').isNumeric().withMessage('Roll number is required and must be a number'),
        body('password').isString().notEmpty().withMessage('Password is required'),],
    loginAuth, 
    async function name(req,res) {
  if(req.user.verified=="true"){
    return res.status(401).json({message:"Email is not verified"})
  }
 
  const salt = await bcrypt.genSalt(10);
  const secPass = await bcrypt.hash(req.body.password, salt);
  const userData = {
    firstName:  req.body.firstName,
    lastName: req.body.lastName,
    email: req.user.email, // Optional
    roll: req.body.roll,
    password: secPass
  }

  try{
    const user = new Student(userData);
    await user.save();
    return res.status(200).json({message:"succesfuly registered"})
  }
  catch(e){
    console.log(e)
    return res.status(500).json({message:"Internal server error"})
  }
  


});


router.post('/studentLogin', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find user by email or roll
      const user = await Student.findOne({email:email
      });
  
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
  
      // Compare hashed passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Generate JWT Token
      const token = jwt.sign(
        { userId: user._id, email: user.email,  },
        JWT_SECRET,
        { expiresIn: '12h' }
      );
  
      res.json({ message: 'Login successful', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
module.exports = router;