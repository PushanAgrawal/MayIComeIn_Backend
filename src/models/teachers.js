const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    firstName: {required:true, type: String },
    lastName: { required:true,type: String },
    email: { required:true, type: String },
    department: {
        type: String,
        enum: ["CSED", "ECED"],
        required: true,
      },
    roomNumber:{type:String , required:true },  
}, { timestamps: true });



const Teacher = new mongoose.model('teacher', teacherSchema);
teacherSchema.index({ firstName: 'text', lastName: 'text' });

module.exports = Teacher;