const validator = require('validator')
const mongoose = require('mongoose')
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate (value) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid Email')
      }
    }
  },
  phone: {
    type: Number,
    minlength: 10,
    maxlength: 10,
    required: true
  },
  address: {
    type: String,
    required: true
  }
})
const Student = new mongoose.model('Student', studentSchema)
module.exports = Student
