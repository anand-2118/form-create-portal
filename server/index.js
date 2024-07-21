const express = require('express');
const mongoose = require('mongoose');
const env = require('dotenv')
const bodyParser = require('body-parser');
const cors = require('cors')
const { logErrorMiddleware } = require('./middlewares/error');
const { logRequestsMiddleware } = require('./middlewares/request');
const authenticationRoute = require('./routes/authenticationRouter');

env.config({ path: `${__dirname}/../.env` });

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
})); 


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// to intercept and log the request
app.use(logRequestsMiddleware);

// app.use('/', (_, res, __) => {
//     res.send("Hello developers");
// });

app.use('/user', authenticationRoute);

app.use(logErrorMiddleware);


app.listen(4000, async () => {
    try {    
        await mongoose.connect(process.env.MONGODB_URI, clientOptions);
        console.log("connected to Db");
    } catch (error) {
        console.log(error)
    }
})
