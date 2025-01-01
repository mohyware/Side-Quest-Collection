//yarn add express cors
//yarn add @types/cors @types/express --dev

import express from 'express';
import cors from 'cors';
require('dotenv').config();
const connectDB = require('../src/db/connect')
const auth = require('./routes/auth')
const app = express();
const authMiddleware = require('./middleware/auth-middleware')

app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use(express.json());
app.use('/users', auth);

app.get('/users/access', authMiddleware, async (req, res) => {
    res.status(200).json({ msg: "life is good" })
})

const startServer = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log('Successfully connected to the database');

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        }).on('error', (err) => {
            console.error('Failed to start the server:', err);
        });

    } catch (error) {
        console.error('Failed to connect to the database:', error);
        process.exit(1);
    }
};


startServer(); 