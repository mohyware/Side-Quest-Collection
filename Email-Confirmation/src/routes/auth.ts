const express = require('express')
const User = require('../model/user')
const { StatusCodes } = require('http-status-codes')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const nodemailer = require("nodemailer");

const router = express.Router()
// middleware 
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})


router.post('/register', async (req, res) => {
    const { email, password, name } = req.body
    try {

        if (!email || !password || !name) {
            return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Please provide email and password' })
        }
        // hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        // create user
        const user = await User.create({ name: name, password: hashedPassword, email: email })
        // send email with id and token
        const token = user.createJWT()
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            host: process.env.SMTP_HOST,
            port: 587,
            secure: false, // true for port 465, false for other ports
            auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        async function main() {
            const info = await transporter.sendMail({
                from: 'mohieelden50@gmail.com', // sender address
                to: email, // list of receivers
                subject: "Confirmation Email ✔", // Subject line
                text: `http://localhost:3000/users/confirm/${user._id}/${token}`, // plain text body
            });

            console.log("Message sent: %s", info.messageId);
            // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@gmail.email>
        }

        main().catch(console.error);

        res.status(StatusCodes.CREATED).json({ msg: `${user.name} created successful please check your mail to confirm!` })
    } catch (err) {
        console.log(err)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Server error' });
    }
})

router.post('/login', async (req, res) => {

    const { email, password } = req.body
    if (!email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Please provide email and password' })
    }
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Invalid Credentials' })
    }
    const isPasswordCorrect = await user.comparePassword(password)

    if (!isPasswordCorrect) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'wrong password' })
    }
    if (user.status === 'pending') {
        return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'this mail not confirmed yet' })
    }

    const token = user.createJWT();

    res.status(StatusCodes.OK).json({ user: { name: user.name }, token, msg: "logged in successfully" })

})

router.get('/confirm/:userId/:token', async (req, res) => {
    const { userId, token } = req.params;
    try {

        const user = await User.findById(userId)
        if (!user) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Invalid link' })
        }

        jwt.verify(
            token,
            process.env.JWT_SECRET,
            (err, decoded) => {
                if (err) {
                    const error = new Error('Invalid link');
                    throw error;
                }
            }
        )
        user.status = 'confirmed';
        await user.save();
        res.json({ message: 'user confirmed successfully you can login now!' })
    } catch (err) {
        console.log(err)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Server error' });
    }
})

module.exports = router;