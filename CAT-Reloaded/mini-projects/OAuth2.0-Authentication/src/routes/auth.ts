const express = require('express')
const router = express.Router()

const User = require('../model/user')
const bcrypt = require('bcryptjs')
const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const authMiddleware = require('../middleware/auth-middleware')


router.get('/access', authMiddleware, async (req, res) => {
    res.status(200).json({ msg: "life is good" })
})

// normal register and login 
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})


router.post('/register', async (req, res) => {
    const { email, password, name } = req.body
    if (!email || !password || !name) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Please provide email and password' })
    }
    const user = await User.create({ name: name, password: password, email: email })
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({ user: { name: user.name } })
    res.send('register')
})

router.post('/login', async (req, res) => {

    const { email, password } = req.body
    if (!email || !password) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Please provide email and password' })
    }
    const user = await User.findOne({ email })
    if (!user) {
        res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Invalid Credentials' })
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'wrong password' })
    }

    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "username": user.name,
                "id": user.id
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1m' }
    )

    const refreshToken = jwt.sign(
        { "username": user.name },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '3m' }
    )

    // Create secure cookie with refresh token 
    res.cookie('jwt', refreshToken, {
        httpOnly: true, //accessible only by web server 
        secure: true, //https
        sameSite: 'None', //cross-site cookie 
        maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
    })

    res.status(StatusCodes.OK).json({ user: { name: user.name }, accessToken, refreshToken })

})

router.post('/refresh', async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized!' })

    const refreshToken = cookies.jwt
    console.log(refreshToken)

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        asyncHandler(async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })

            const foundUser = await User.findOne({ name: decoded.username })

            if (!foundUser) return res.status(401).json({ message: 'Unauthorized@' })

            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": foundUser.username,
                        "roles": foundUser.roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1m' }
            )

            res.json({ accessToken })
        })
    )
})

router.delete('/logout', (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204) //No content
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.json({ message: 'Cookie cleared' })
})

module.exports = router;