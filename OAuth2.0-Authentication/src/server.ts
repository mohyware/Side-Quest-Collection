//yarn add express cors
//yarn add @types/cors @types/express --dev

import express from 'express';
import cors from 'cors';
require('dotenv').config();
const connectDB = require('../src/db/connect')
const auth = require('./routes/auth')
const app = express();
const authMiddleware = require('./middleware/auth-middleware')
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use(express.json());
app.use('/users', auth);

app.get('/users/access', authMiddleware, async (req, res) => {
    res.status(200).json({ msg: "life is good" })
})

const startServer = async () => {
    await connectDB(process.env.MONGO_URI);
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
};

startServer(); 