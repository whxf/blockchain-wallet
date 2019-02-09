var exports = {
    login: function (req, res, next) {
        res.render('login');
    },

    register: function (req, res, next) {
        res.render('register');
    },

    home: function (req, res, next) {
        res.render('home');
    },

    transfer: function (req, res, next) {
        res.render('transfer');
    },

    dashboard: function (req, res, next) {
        res.render('dashboard');
    },

    checkRecord: function (req, res, next) {
        res.render('check-record');
    },

    recharge: function (req, res, next) {
        res.render('recharge');
    },

    withdraw: function (req, res, next) {
        res.render('withdraw');
    },
};

module.exports = exports;