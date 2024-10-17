const ensureLogIn = require('connect-ensure-login').ensureLoggedIn;
const ensureLoggedIn = ensureLogIn();
const passport = require('passport');

import express from 'express'
const router = express.Router()

router.get('/', (req, res) => {
    res.send('<a href="/google">Authenticate with Google</a>');
});

router.get('/google',
    passport.authenticate('google', { scope: ['email', 'profile'] }
    ));

router.get('/google/redirect',
    passport.authenticate('google', {
        successRedirect: '/api/v1/googleAuth/protected',
        failureRedirect: '/api/v1/googleAuth/google/failure'
    })
);

router.get('/protected', ensureLoggedIn, (req, res) => {
    if (req.user) {
        const { user } = req
        console.log(user)
        res.send(`Hello ${req.user || 'User'}`);
    } else {
        res.send(`no`);
    }
});

router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error('Logout error:', err);
            return res.status(500).send('An error occurred during logout');
        }

        req.session.destroy((sessionErr) => {
            if (sessionErr) {
                console.error('Session destroy error:', sessionErr);
                return res.status(500).send('An error occurred while destroying the session');
            }

            res.send('Goodbye!');
        });
    });
});


router.get('/google/failure', (req, res) => {
    res.send('Failed to authenticate..');
});

module.exports = router;