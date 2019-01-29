var bcrypt = require('bcrypt-nodejs');

var exports = {
    compare_password: function (req, res, next) {
        var input_phone = req.body.phone;
        var input_password = req.body.password;

        console.log(input_phone, input_password);

        var pwd = '123456';
        var salt = bcrypt.genSaltSync(10);
        var hash_pwd = bcrypt.hashSync(pwd, salt);

        if (bcrypt.compareSync(input_password, hash_pwd)) {

            res.render('dashboard');
        } else {
            res.render('login');
        }
    }
};


module.exports = exports;