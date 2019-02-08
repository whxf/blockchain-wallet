var exports = {
    login: function (req, res, next) {
        res.render('login');
    },

    logout: function (req, res, next) {
        res.render('index', {title: 'Logout'});
    },

    register: function (req, res, next) {
        res.render('register');
    },

    home: function (req, res, next) {
        res.render('home', {title: 'home'});
    },

    transfer: function (req, res, next) {
        res.render('transfer');
    },

    dashboard: function (req, res, next) {
        res.render('dashboard');
    },
};

module.exports = exports;