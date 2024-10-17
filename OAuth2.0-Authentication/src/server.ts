//yarn add express cors
//yarn add @types/cors @types/express --dev

import express from 'express';
import cors from 'cors';
require('dotenv').config();
const app = express();

const connectDB = require('../src/db/connect')

const auth = require('./routes/auth')
const googleAuth = require('./routes/google-auth')

const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use(express.json());
app.use('/api/v1/auth', auth);

const passport = require('passport');
require('./config/passport');
const session = require('express-session');

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/v1/googleAuth', googleAuth);


const startServer = async () => {
    await connectDB(process.env.MONGO_URI);
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
};

startServer(); 