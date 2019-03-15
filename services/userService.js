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
    /**
     * 添加新用户
     * @param nickname
     * @param phone
     * @param password  登录密码
     * @param transfer_password  支付密码
     * @returns {Promise<*>}
     */
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
    /**
     * 根据用户手机号查找用户
     * @param phone
     * @returns {Promise<*>}  根据result.data.column_name直接获取字段值
     */
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
    /**
     * 根据用户手机号获取用户余额
     * @param phone
     * @returns {Promise<*>}  根据result.data.balance直接获取字段值
     */
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
    /**
     * 根据用户手机号修改余额
     * @param phone
     * @param balance
     * @returns {Promise<*>}
     */
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
    /**
     * 根据用户手机号修改用户昵称
     * @param phone
     * @param nickname
     * @returns {Promise<*>}
     */
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
    /**
     * 根据用户手机号修改用户登录密码
     * @param phone
     * @param password
     * @returns {Promise<*>}
     */
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
    /**
     * 根据用户手机号修改用户支付密码
     * @param phone
     * @param password
     * @returns {Promise<*>}
     */
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
    /**
     * 根据手机号设置用户的冻结结束时间
     * 每次冻结5小时，冻结结束时间是当前时间+5小时
     * @param phone
     * @returns {Promise<*>}
     */
    setUserFreezeTime: async function (phone) {
        try {
            var freeze_time = (new Date()).addHours(5); // 设置冻结结束时间
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

module.exports = exports;
