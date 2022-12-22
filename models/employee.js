const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  employeecode: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Employee', employeeSchema);