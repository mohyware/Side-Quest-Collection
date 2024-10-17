const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
import { Profile } from 'passport-google-oauth20';
const { User } = require('../model/user')
const { FederatedCredential } = require('../model/user')

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_REDIRECT_URL,
    passReqToCallback: true,
},
    async (request, accessToken, refreshToken, profile: Profile, cb) => {

        try {
            // Check if the federated credential exists
            let credential = await FederatedCredential.findOne({
                provider: 'https://accounts.google.com',
                subject: profile.id
            });

            if (!credential) {
                //  Create a new user.
                console.log('The account at Google has not logged in to this app before.')
                console.log(`${profile.displayName}`)
                const user = new User({
                    name: profile.displayName,
                    email: profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null
                });
                await user.save();

                // Create a federated credential for the new user
                credential = new FederatedCredential({
                    userId: user._id,
                    provider: 'https://accounts.google.com',
                    subject: profile.id
                });
                await credential.save();

                return cb(null, { id: user._id, name: user.name });
            } else {
                // Get the user record.
                const user = await User.findById(credential.userId);
                console.log('The account at Google has previously logged in to the app')
                if (!user) {
                    return cb(null, false);
                }
                return cb(null, user);
            }
        } catch (err) {
            return cb(err);
        }
        // return done(null, user);
    }));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user); // Attach the full user object to req.user
    } catch (err) {
        done(err, null);
    }
});