const fs = require("fs");
const path = require("path");

const logStream = fs.createWriteStream(path.join(__dirname + '/../logs/', "log.txt"), {
    flags: "a"
})

const logRequestsMiddleware = (req, _, next) => {
    const now = new Date();
    const time = ` ${now.toLocaleTimeString()} `;
    const log = `${req.method} ${req.originalUrl} ${time}`
    logStream.write(log + "\n")
    next();
}

module.exports = { logRequestsMiddleware };