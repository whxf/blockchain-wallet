# BCWallet

* 项目简介：

BCwallet 是一个基于区块链技术的支付平台。本项目为毕业设计项目，其中涉及的转账等相关服务均为模拟过程，不涉及任何存在实在价值的交换。

* 项目意义：

第三方支付机构结算业务非常不利于监管，风险隐患较多。区块链信息不可篡改性与去信任机制等特点非常适用于该场景，基于区块链的钱包系统能构建更加安全、高效的支付平台

* 项目地址：

https://wallet.xixilili.cn

## 项目目录

```
myapp/
├── app.js
├── bin
│   └── www                 程序入口
├── package-lock.json
├── package.json            包依赖
├── pm2.yml                 pm2 配置文件
├── public
│   ├── images              前端图片素材
│   │   ├── alipay.png
│   │   └── avatar.png
│   ├── javascripts
│   │   ├── constants       常量
│   │   │   ├── conf.js     配置
│   │   │   ├── db.js       数据库配置（mysql，redis）
│   │   │   └── secret.js   私密信息
│   │   ├── controllers                     控制器
│   │   │   ├── blockchainController.js     blockchain相关操作（create，query）
│   │   │   ├── dataController.js           mysql操作
│   │   │   ├── indexController.js          页面index
│   │   │   ├── transferController.js       转账操作
│   │   │   └── userController.js           用户操作
│   │   ├── services                        区块链服务和mysql数据库服务
│   │   │   ├── enrollAdmin.js              区块链生成admin证书
│   │   │   ├── registerUser.js             区块链注册用户
│   │   │   ├── transferService.js          转账相关服务
│   │   │   └── userService.js              用户相关服务
│   │   └── views                           jquey各种事件与pug view相对应            
│   │       ├── changepwd.js
│   │       ├── check_tools.js
│   │       ├── dashboard.js
│   │       ├── home.js
│   │       ├── information.js
│   │       ├── login.js
│   │       ├── record.js
│   │       ├── register.js
│   │       └── transfer.js                 里面包含了transfer、recharge、withdraw
│   └── stylesheets
│       ├── custom.css
│       └── style.css
├── routes                                  路由
│   ├── api.js                              api路由
│   └── index.js                            页面路由
└── views                                   前端页面
    ├── changepwd.pug
    ├── dashboard.pug
    ├── error.pug
    ├── home.pug
    ├── information.pug
    ├── layout.pug                          模板
    ├── login.pug
    ├── recharge.pug
    ├── record.pug
    ├── register.pug
    ├── transfer.pug
    └── withdraw.pug
```