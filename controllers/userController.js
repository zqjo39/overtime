const {Role} = require('../models');

module.exports.registerRegistrationForm = async function(req, res) {
    const roles = await Role.findAll();
    res.render('users/register', {
        roles
    });
};