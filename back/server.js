const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const { authUser } = require('./middlware/auth.middleware');
require('dotenv').config({ path: './config/.env' });
const cors = require('cors');

const app = express();

// Connection à database
require('./config/db');

//  Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//  Authentification JWT
app.use('*', authUser);

//  Routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

//  Listen
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
