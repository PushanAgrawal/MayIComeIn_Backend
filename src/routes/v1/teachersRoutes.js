const express = require("express");
const loginAuth = require("../../middlewares/authMiddleware");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const Student = require("../../models/student")
const Teacher = require("../../models/teachers")
const {JWT_SECRET} = require("../../config/server-config")





// router.get("/getTeachers", loginAuth, async function name(req, res) {
//   const department = req.query.department;

//   try {
//     const query = department ? { department: department } : {};
//     const allteachers = await Teacher.find(query);
//     return res.status(200).json({ teachers: allteachers });
//   } catch (e) {
//     console.log(e);
//     return res.status(500).json({ message: "Internal server error" });

// router.get("/getTeachers",
//   // loginAuth, 
//   async function name(req,res) {
//     const department = req.query.department;
    
//     try{
//       const query = department ? { department: department } : {};
//       const allteachers = await Teacher.find(query);
//       return res.status(200).json({teachers:allteachers})
//     }
//     catch(e){
//       console.log(e)
//       return res.status(500).json({message:"Internal server error"})
//     }
// });
router.get('/getTeachers', async (req, res) => {
  const { department, search } = req.query;
  let query = {};

  if (department) query.department = department;

  if (search) {
    query.$or = [
      { firstName: { $regex: search, $options: 'i' } },
      { lastName: { $regex: search, $options: 'i' } }
    ];
  }
  console.log(query)

  try {
    const teachers = await Teacher.find(query);
    res.json({ teachers });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
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