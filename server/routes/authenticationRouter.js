const express = require('express');
const router = express.Router()
const { registerUser } = require('../controllers/registerUser')
const { signInUser } = require('../controllers/signInUser')
// const { registerUser } = require('../controllers/logoutUser')

router.post('/register', registerUser);
router.post('/login', signInUser);


module.exports = router;