const fs = require("fs");
const path = require("path");
const { error } = require('console');

const logStream = fs.createWriteStream(path.join(__dirname + '/../logs/', "log.txt"), {
    flags: "a"
})
const errorStream = fs.createWriteStream(path.join(__dirname + '/../logs/', "error.txt"), {
    flags: "a"
})

const logErrorMiddleware = (err, req, res, _) => {
    const now = new Date();
    const time = ` ${now.toLocaleTimeString()} `;
    const log = `${req.method} ${req.originalUrl} ${time} `
    errorStream.write(error + ' ' + err.stack + '\n' + err.status + ' ' + err.message + ' ' + log + "\n")
    res.status(err.statusCode).send(err.message);
}

module.exports = { logErrorMiddleware };