# BCWallet

* 项目简介：

BCwallet 是一个基于区块链技术的支付平台。本项目为毕业设计项目，其中涉及的转账等相关服务均为模拟过程，不涉及任何存在实在价值的交换。

* 项目意义：

第三方支付机构结算业务非常不利于监管，风险隐患较多。区块链信息不可篡改性与去信任机制等特点非常适用于该场景，基于区块链的钱包系统能构建更加安全、高效的支付平台

* 项目地址：

https://wallet.xixilili.cn

* 项目目录

```markdown
./
├── README.md
├── app.js
├── package-lock.json
├── package.json
├── pm2.yml
├── bin
│   └── www
├── config
│   ├── db.js
│   └── secret.js
├── controllers
│   ├── blockchainController.js
│   ├── indexController.js
│   ├── transferController.js
│   └── userController.js
├── models
│   └── users.js
├── public
│   ├── images
│   │   ├── alipay.png
│   │   └── avatar.png
│   ├── javascripts
│   │   ├── changePassword.js
│   │   ├── checkTools.js
│   │   ├── dashboard.js
│   │   ├── home.js
│   │   ├── information.js
│   │   ├── login.js
│   │   ├── record.js
│   │   ├── register.js
│   │   └── transfer.js
│   └── stylesheets
│       ├── custom.css
│       └── style.css
├── routes
│   ├── api.js
│   ├── index.js
│   ├── message.js
│   ├── transfer.js
│   └── user.js
├── services
│   ├── enrollAdmin.js
│   ├── registerUser.js
│   └── userService.js
└── views
    ├── changepwd.pug
    ├── dashboard.pug
    ├── error.pug
    ├── home.pug
    ├── information.pug
    ├── layout.pug
    ├── login.pug
    ├── recharge.pug
    ├── record.pug
    ├── register.pug
    ├── transfer.pug
    └── withdraw.pug
```