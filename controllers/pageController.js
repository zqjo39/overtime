const {Role, User} = require('../models');

module.exports.renderAccounting = function(req, res){
    if (!req.user.can('view accounting')) {
        res.redirect('/');
        return;
    }
    res.render('pages/accounting');
};

module.exports.renderDashboard = function(req, res){
    if (!req.user.can('view dashboard')) {
        res.redirect('/');
        return;
    }
    res.render('pages/dashboard');
};

module.exports.renderHR = async function(req, res){
    console.log(req.user);
    if (!req.user.can('view hr')) {
        res.redirect('/');
        return;
    }
    const users = await User.findAll();
    res.render('pages/hr', {users});
};

module.exports.renderMarketing = function(req, res){
    if (!req.user.can('view marketing')) {
        res.redirect('/');
        return;
    }
    res.render('pages/marketing');
};

module.exports.renderSales = function(req, res){
    if (!req.user.can('view sales')) {
        res.redirect('/');
        return;
    }
    res.render('pages/sales');
};

module.exports.viewProfile = async function(req, res) {
    const user = await User.findByPk(req.params.id);
    console.log(user);
    res.render(`pages/profile`, {user});
};
