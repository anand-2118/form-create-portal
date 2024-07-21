const User = require('../models/User')
const bcrypt = require('bcrypt');
const createError = require('http-errors')

const registerUser = async (req, res, next) => {
    let error = null;
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password ) {
            console.log(name, email, password);
            error = createError(400, 'Please fill all the details');
        }

        const isUserExists = await (User.findOne({ email }))
        if (isUserExists) {
            error = createError(400, "user already exists");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });
        await newUser.save();

        res.status(200).send("User registered successfully");
    }
    catch (err) {
        // Pass the error to the error-handling middleware
        next(error || err);
    }
}

module.exports = { registerUser };
