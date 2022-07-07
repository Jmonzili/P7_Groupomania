const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user.routes');
require('dotenv').config({path: './config/.env'});
require('./config/db');
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//  JWT


//  Routes
app.use('/api/user', userRoutes);

//  Listen
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})