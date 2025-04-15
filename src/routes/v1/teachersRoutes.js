const express = require("express");
const loginAuth = require("../../middlewares/authMiddleware");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const Student = require("../../models/student")
const Teacher = require("../../models/teachers")
const {JWT_SECRET} = require("../../config/server-config")


router.get("/getTeachers",
    loginAuth, 
    async function name(req,res) {

 
  try{
    const allteachers =await Teacher.find({});

    return res.status(200).json({tachers:allteachers})
  }
  catch(e){
    console.log(e)
    return res.status(500).json({message:"Internal server error"})
  }
  


});

router.post("/addTeacher",
    [body('firstName').isString().notEmpty().withMessage('First name is required'),
    body('lastName').isString().notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('department').isIn(["CSED", "ECED"]).withMessage('Invalid department'),
    body('roomNumber').isString().notEmpty().withMessage('Room number is required')],
    async function(req,res){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const { firstName, lastName, email, department, roomNumber } = req.body;

        try {
            // Check if email already exists
            const existingTeacher = await Teacher.findOne({ email });
            if (existingTeacher) {
              return res.status(400).json({ message: 'Email already in use' });
            }
            const teacher = new Teacher({ firstName, lastName, email, department, roomNumber });
            await teacher.save();
        
            return  res.status(201).json({ message: 'Teacher added successfully', teacher });
          } catch (error) {
            console.error(error);
            return  res.status(500).json({ message: 'Server error' });
          }
        

})


module.exports = router