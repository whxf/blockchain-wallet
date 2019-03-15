'use strict';

require('date-utils');
var mysql = require('mysql');
var config = require('../config/db');//引入基础配置
var Sequelize = require('sequelize');//引入orm
var db = {
    sequelize: new Sequelize(
        config.sequelize.database,
        config.sequelize.username,
        config.sequelize.password,
        config.sequelize)
};

db.User = db.sequelize.import('../models/users.js'); // 引入model 数据user表
db.User.sequelize.sync();
var User = db.User;

exports = {
    addUser: async function (nickname, phone, password, transfer_password) {
        try {
            var user_result = await User.create({
                'nickname': nickname,
                'phone': phone,
                'password': password,
                'transfer_password': transfer_password
            });
            return {
                status: 0,
                message: '注册成功'
            };
        } catch (err) {
            console.log(`注册失败${err}`);
            return {
                status: 1,
                message: `注册失败${err}`
            };
        }
    },
    getUserByPhone: async function (phone) {
        try {
            var result = await User.findAll({
                'where': {
                    'phone': phone,
                }
            });
            if (result.length === 0){
                return {
                    status: 0,
                    message: '查询成功',
                    data: null
                };
            }
            // console.log('qweqweq',result);
            return {
                status: 0,
                message: '查询成功',
                data: result[0]
            };
        } catch (err) {
            console.log(`查询失败${err}`);
            return {
                status: 1,
                message: `查询失败${err}`
            };
        }
    },
    getBalance: async function (phone) {
        try {
            var result = await User.findAll({
                'attributes': ['balance'],
                'where': {
                    'phone': phone,
                }
            });
            return {
                status: 0,
                message: '查询成功',
                data: result[0]
            };
        } catch (err) {
            console.log(`查询失败${err}`);
            return {
                status: 1,
                message: `查询失败${err}`
            };
        }
    },
    setBalance: async function (phone, balance) {
        try {
            var result = await User.update({
                'balance': balance
            }, {
                'where': {
                    'phone': phone
                }
            });
            return {
                status: 0,
                message: '更新成功',
            };
        } catch (err) {
            console.log(`更新失败${err}`);
            return {
                status: 1,
                message: `更新失败${err}`
            };
        }
    },
    setUserNickname: async function (phone, nickname) {
        try {
            var result = await User.update({
                'nickname': nickname
            }, {
                'where': {
                    'phone': phone
                }
            });
            return {
                status: 0,
                message: '更新成功',
            };
        } catch (err) {
            console.log(`更新失败${err}`);
            return {
                status: 1,
                message: `更新失败${err}`
            };
        }
    },
    setUserPassword: async function (phone, password) {
        try {
            var result = await User.update({
                'password': password
            }, {
                'where': {
                    'phone': phone
                }
            });
            return {
                status: 0,
                message: '更新成功',
            };
        } catch (err) {
            console.log(`更新失败${err}`);
            return {
                status: 1,
                message: `更新失败${err}`
            };
        }
    },
    setUserTransferPassword: async function (phone, password) {
        try {
            var result = await User.update({
                'password': password
            }, {
                'where': {
                    'phone': phone
                }
            });
            return {
                status: 0,
                message: '更新成功',
            };
        } catch (err) {
            console.log(`更新失败${err}`);
            return {
                status: 1,
                message: `更新失败${err}`
            };
        }
    },
    setUserFreezeTime: async function (phone) {
        try {
            var freeze_time = (new Date()).addHours(5);
            var result = await User.update({
                'freeze_time': freeze_time
            }, {
                'where': {
                    'phone': phone
                }
            });
            return {
                status: 0,
                message: '更新成功',
            };
        } catch (err) {
            console.log(`更新失败${err}`);
            return {
                status: 1,
                message: `更新失败${err}`
            };
        }
    },
};

// async function f() {
//     await exports.setBalance('15726672896', '10');
//     // console.log(ret.data.balance);
// }
//
// f();


module.exports = exports;
