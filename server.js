const express = require('express');
const cors	  = require('cors');
const mongoose = require('mongoose');
const path  = require('path');
const app  = express()
const Employee = require('./models/employee');
const bodyParser = require('body-parser');
const route = require('./routes/router');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'



mongoose.set("strictQuery", false);
// mongoose.connect('mongodb://localhost:27017', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true

// });
mongoose.connect('mongodb://localhost:27017/test-oct', {
})

app.use(bodyParser.json());
app.use('/', route);
app.use(cors());

app.listen(9999, () => {
	console.log('Server up at 9999')
})