const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
require('dotenv').config({path: './config/.env'});
require('./config/db');
const { checkUser, requireAuth } = require('./middleware/auth.middleware');
const app = express();

//  Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

//  Authentification JWT
app.use('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id)
});

//  Routes
app.use('/api/user', userRoutes);

//  Listen
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})