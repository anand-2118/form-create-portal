const jwt = require('jsonwebtoken');

const logoutUser = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            res.status(401).send("Access denied. No token provided.");
        }    
        jwt.verify(token, JWT_SECRET);
        res.status(200).send("Logout successful");
    } catch (err) {
        next(err);
    }
};
module.exports = { logoutUser };