const {Role, User} = require('../models');
const md5 = require('md5');
const passport = require('passport');

module.exports.renderRegistrationForm = async function(req, res) {
    const roles = await Role.findAll();
    res.render('users/register', {
        roles
    });
};

module.exports.registerUser = async function(req, res) {
    await User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        dob: new Date(req.body.dob),
        phone_number: req.body.phone_number,
        email: req.body.email,
        password: md5(req.body.password),
        address_one: req.body.address_one,
        address_two: req.body.address_two,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        year_hired: new Date(),
        role_id: req.body.role_id
    })
    res.redirect('/');
};

module.exports.renderLoginForm = function (req, res) {
    const errors = req.session.messages || [];
    res.render('users/login', {errors});
};

module.exports.loginUser = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureMessage: true
});

module.exports.logout = function(req, res) {
    req.logout();
    res.redirect('/login');
}