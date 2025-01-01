import express from 'express';
import passport from 'passport';
import { ensureLoggedIn } from 'connect-ensure-login';

const router = express.Router();

// Route to initiate Facebook authentication
router.get('/', (req, res) => {
    res.send('<a href="/facebook">Authenticate with Facebook</a>');
});

// Facebook authentication route
router.get('/facebook',
    passport.authenticate('facebook', { scope: ['email', 'public_profile'] })
);

// Callback route after Facebook has authenticated the user
router.get('/facebook/redirect',
    passport.authenticate('facebook', {
        successRedirect: '/api/v1/facebookAuth/protected',
        failureRedirect: '/api/v1/facebookAuth/facebook/failure'
    })
);

// Protected route that requires the user to be logged in
router.get('/protected', ensureLoggedIn(), (req, res) => {
    if (req.user) {
        const { user } = req;
        console.log(user);
        res.send(`Hello ${req.user || 'User'}`);
    } else {
        res.send('No user found.');
    }
});

// Logout route
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

// Failure route for Facebook authentication
router.get('/facebook/failure', (req, res) => {
    res.send('Failed to authenticate with Facebook.');
});

module.exports = router;