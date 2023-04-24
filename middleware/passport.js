const passport = require('passport');
const {Strategy} = require('passport-local').Strategy;
const {User, Role, Permission} = require('../models');
const md5 = require('md5');

// this function is called on authenticate to test if the user's credentials are valid
async function verifyUser(username, password, done) {
    // fetch user from database
    const user = await User.findOne({
        where: {
            email: username,
            password: md5(password)
        }
    });
    // if no user, or passwords do not match, call done with a failure message
    if (!user) {
        return done(null, false, {message: 'Incorrect email or password.'});
    }
    // passed authentication, so user passes
    return done(false, {
        id: user.id,
    });
}

passport.use(
    new Strategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        verifyUser
    )
);

// turn user object into an object that can be passed into a cookie
passport.serializeUser(function(user, done) {
    process.nextTick(function() {
        done(null, {id: user.id});
    });
});

// turn serialized object back into an object (but in our case, we don't need to do anything)
passport.deserializeUser(async function(user, done) {
    const userModel = await User.findByPk(user.id, {
        include: [
            {
                model: Role,
                as: 'role',
                include: [
                    {
                        model: Permission,
                        as: 'permissions'
                    }
                ],
            }
        ]
    });
    process.nextTick(function() {
        return done(null, userModel);
    });
});

module.exports.passport = passport;