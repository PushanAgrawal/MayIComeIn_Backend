const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
      unique: true,
    },
    department: {
      type: String,
      enum: ["CSED", "ECED"],
      required: true,
    },
    roomNumber: { type: String, required: true },
    academia: {
      specialization: [{ type: String, required: true }],
      papers: [{ type: String, required: true }],
    },
    slots: {
      type: [
        {
          student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
            default: null,
          },
          status: {
            type: String,
            enum: ["available", "booked", "completed"],
            required: true,
            default: "available",
          },
          time: { type: Date, required: true },
        },
      ],
      default: [],
    },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const Teacher = mongoose.model("teacher", teacherSchema);

module.exports = Teacher;
