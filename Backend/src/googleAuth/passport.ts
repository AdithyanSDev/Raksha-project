import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { UserRepository } from '../repositories/UserRepository'; 
import bcrypt from 'bcrypt';

const userRepository = new UserRepository();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID! ,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET! ,
            callbackURL: '/api/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                if (!profile.emails || profile.emails.length === 0) {
                    return done(new Error("No email found in profile"), false);
                }

                let user = await userRepository.findUserByEmail(profile.emails[0].value);

                if (!user) {
                    const dummyPassword = await bcrypt.hash('oauth_dummy_password', 10);
                    const defaultLocation = { latitude: 0, longitude: 0 };

                    user = await userRepository.createUser({
                        username: profile.displayName,
                        email: profile.emails[0].value,
                        password: dummyPassword,
                        location: defaultLocation,
                    });
                }

                done(null, user || false);
            } catch (error) {
                done(error, false);
            }
        }
    )
);

passport.serializeUser((user: any, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await userRepository.findUserByEmail(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});
