const express = require('express');
const router = express.Router();

const {login, signupController} = require('../controllers/controllers');

router.post('/login', login);
router.post('/signup', signupController);

module.exports = router;