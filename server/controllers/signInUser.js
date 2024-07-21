const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signInUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).send('Please fill all the details')
        }

        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).send("User does not exist")
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            res.status(400).send("invalid credentials");
        }

        const token = jwt.sign({ userId: user.__id }, "secret", {
            expiresIn: "240h",
        })

        res.status(200).json({
            token,
            userId: user._id,
            name: user.name,
            email: user.email,
        });
    } catch (err) {
        next(err);
    }

}

module.exports = { signInUser };