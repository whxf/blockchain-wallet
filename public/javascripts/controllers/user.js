var exports = {
    login: function (req, res, next) {
        res.render('index', {title: 'Login'});

    },

    logout: function (req, res, next) {
        res.render('index', {title: 'Logout'});
    },

    register: function (req, res, next) {
        res.render('index', {title: 'Register'});
    },

    home: function (req, res, next) {
        res.render('home');
    }
};

module.exports = exports;