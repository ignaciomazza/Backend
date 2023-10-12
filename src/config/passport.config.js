import passport from "passport";
import LocalStrategy from "passport-local"
import GitHubStrategy from 'passport-github2';
import bcrypt from "bcrypt"
import { userModel } from "../dao/models/user.model.js";

function userRol(email, password) {
    if (email == 'adminCoder@coder.com' && password == 'adminCod3r123') {
        return 'admin';
    } else {
        return 'user';
    }
}

const initializePassport = () => {
    passport.use(
        'register',
        new LocalStrategy(
            { passReqToCallback: true, usernameField: 'email' },
            async (req, username, password, done) => {
                const { first_name, last_name, age } = req.body;
                const rol = await userRol(username, password);
                try {
                    const exists = await userModel.findOne({ email: username });
                    if (exists) {
                        return done(null, false);
                    }

                    const user = await userModel.create({
                        first_name,
                        last_name,
                        age,
                        email: username,
                        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
                        rol,
                    });
                    return done(null, user);
                } catch (error) {
                    return done(error);
                }
            }
        )
    );

    passport.use(
        'login',
        new LocalStrategy(
            { usernameField: 'email' },
            async (username, password, done) => {
                try {
                    const user = await userModel.findOne({ email: username });
                    if (!user) {
                        return done(null, false);
                    }

                    if (!bcrypt.compareSync(password, user.password)) {
                        return done(null, false);
                    }

                    return done(null, user);
                } catch (error) {
                    return done(error);
                }
            }
        )
    );

    passport.use(
        'github',
        new GitHubStrategy(
            {
                clientID: 'Iv1.7b25c665ddf1eb31',
                clientSecret: '769cafbefd06f7aacba7094c2b822fca1900320f',
                callbackURL: 'http://localhost:8080/api/user/githubcallback',
                scope: ['user:email'],
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    const email = profile.emails[0].value;
                    const user = await userModel.findOne({ email });
                    if (!user) {
                        const newUser = await userModel.create({
                            first_name: profile._json.name,
                            last_name: '',
                            age: 18,
                            password: '',
                            email,
                        });
                        done(null, newUser);
                    } else {
                        done(null, user);
                    }
                } catch (error) {
                    done(error);
                }
                console.log(profile)
            }
        )
    );


    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id);
        done(null, user);
    });
}

export default initializePassport;