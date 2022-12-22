const bcrypt = require('bcryptjs');
const Employee = require('../models/employee');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'

exports.signupController = (req, res) => {
  const { employeecode, password } = req.body;

  // Check if the employeecode is already in use
  Employee.findOne({ employeecode }).exec((err, employee) => {
    if (err) {
      return res.status(500).send({ message: 'Error occurred while checking employeecode availability.' });
    }

    if (employee) {
      return res.status(400).send({ message: 'The provided employeecode is already in use.' });
    }

    // Hash the password
    bcrypt.hash(password, 10, (error, hashedPassword) => {
      if (error) {
        return res.status(500).send({ message: 'Error occurred while hashing the password.' });
      }

      // Create a new employee
      const newEmployee = new Employee({
        employeecode,
        password: hashedPassword,
      });

      // Save the employee to the database
      newEmployee.save((saveError) => {
        if (saveError) {
          return res.status(500).send({ message: 'Error occurred while saving the employee to the database.' });
        }

        // Generate a JSON Web Token (JWT)
        const token = jwt.sign({ employeecode }, JWT_SECRET, { expiresIn: '1h' });

        // Send the JWT and the new employee back to the client
        return res.status(200).send({ token, employee: newEmployee });
      });
    });
  });

};

exports.login = (req, res) => {
  const { employeecode, password } = req.body;

  // Find the employee with the matching employeecode
  Employee.findOne({ employeecode }).exec((err, employee) => {
    if (err) {
      return res.status(500).send({ message: 'Error occurred while logging in.' });
    }

    if (!employee) {
      return res.status(404).send({ message: 'No employee found with the provided employeecode.' });
    }

    // Compare the provided password with the hashed password in the database
    bcrypt.compare(password, employee.password, (error, result) => {
      if (error) {
        return res.status(500).send({ message: 'Error occurred while logging in.' });
      }

      if (!result) {
        return res.status(401).send({ message: 'Incorrect password.' });
      }

      // If the password is correct, return a JWT token
      const token = jwt.sign({ employeecode: employee.employeecode }, JWT_SECRET, { expiresIn: '1d' });
      return res.status(200).send({ token });
    });
  });
};


