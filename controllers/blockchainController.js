'use strict';

const fabric_ca_services = require('fabric-ca-client');
const {FileSystemWallet, Gateway, X509WalletMixin} = require('fabric-network');
const fs = require('fs');
const path = require('path');
const secret = require('../config/secret');

const ccp_path = path.resolve(secret.fabric_network_path, 'connection.json');
const ccp_json = fs.readFileSync(ccp_path, 'utf8');
const ccp = JSON.parse(ccp_json);

var createRecord = async function (sender, receiver, transfer_amount, transfer_type) {
    sender = sender.toString();
    receiver = receiver.toString();
    transfer_amount = transfer_amount.toString();
    transfer_type = transfer_type.toString();

    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('user_admin');
        if (!userExists) {
            console.log('An identity for the user "user_admin" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, {wallet, identity: 'user_admin', discovery: {enabled: false}});

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('wallet');

        // Submit the specified transaction.
        await contract.submitTransaction('createRecord', sender, receiver, transfer_amount, transfer_type);
        // await contract.submitTransaction('createRecord', 'test1', 'test3', '23.2', '3');
        // await contract.submitTransaction('createRecord', 'test2', 'test1', '122.2', '2');
        // await contract.submitTransaction('createRecord', 'test1', 'test3', '23.22', '3');

        console.log('Transaction has been submitted');

        // Disconnect from the gateway.
        await gateway.disconnect();

        return {
            'status': 0,
            'message': '操作成功！',
        };

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        return {
            'status': 1,
            'message': '操作失败！',
        };
    }
};


var queryRecord = async function (user_phone) {
    user_phone = user_phone.toString();
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('user_admin');
        if (!userExists) {
            console.log('An identity for the user "user_admin" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, {wallet, identity: 'user_admin', discovery: {enabled: false}});

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('wallet');

        // Evaluate the specified transaction.
        const result = await contract.evaluateTransaction('queryRecord', user_phone);
        // console.log(`Transaction has been evaluated, result is: ${result}`);

        return {
            'status': 0,
            'message': '查询成功！',
            'data': result.toString()
        };

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        return {
            'status': 1,
            'message': '查询失败！',
        };
    }
};


module.exports = {
    createRecord: createRecord,
    queryRecord: queryRecord
};