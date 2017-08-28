var express = require('express');
var router = express.Router();
const Web3 = require('web3');
// const ProviderEngine = require('web3-provider-engine');
// const Web3Subprovider = require("web3-provider-engine/subproviders/web3.js");
// const WalletSubprovider = require('web3-provider-engine/subproviders/wallet.js');
// const EthereumWallet = require('ethereumjs-wallet');
const contract_config = require("../contracts/contract");
const config =   require("../contracts/config");

const provider_url = 'http://hackaton.izx.io:18555';
const wallet_addr = '0xe8798c379d5ca8b3ac3bfeb354c7a70884206e5d';
const wallet_pkey = 'f07743ca2985cdd9cedd61ec393366c3d0147dc2cef1758234c1427700347c9a';

// const usersRouter = require("./users");

// router.use("/users", usersRouter);

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render( 'index', { title: 'Hackathon', default_addr: wallet_addr } );
});


// router.get('/balance', function(req, res){


//     var address = req.query.address;
//     const web3 = new Web3(new Web3.providers.HttpProvider(provider_url));

//     web3.eth.getBalance(address,
//         function(error, result){
//             console.log(error, result);
//             if(error || !result) {
//                 res.send({time: Date.now(), address: address, balance: error, state: 'danger'  });
//             }else{
//                 var balance = web3.fromWei(result);
//                 res.send({time: Date.now(), address: address, balance: balance, state: 'success'  });
//             }
//         }
//     );
// });


router.get('/send', function(req, res){

    // var address = req.body.address;
    // var amount = req.body.amount;

    // if(!address){
    //     res.send({time: Date.now(), address: address, result: 'Адрес не указан', state: 'warning' });
    //     return;
    // }else if(!amount || amount > 10){
    //     res.send({time: Date.now(), address: address, result: 'Сумма неверная', state: 'warning'  });
    //     return;
    // }

    var address = "0x25f2be34a672d6aed19eae00f49fffed623be754";
    var abi = [{"constant":false,"inputs":[],"name":"contractDone","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"contractNotDone","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"role","type":"bytes32"},{"name":"addr","type":"address"}],"name":"approve","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"role","type":"bytes32"},{"name":"addr","type":"address"}],"name":"addParticipant","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"checkProgress","outputs":[{"name":"","type":"uint256[2]"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"prod","type":"address"},{"name":"cust","type":"address"}],"name":"init","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
    console.log(config);
    
    // const provider_url = config.provider_url;
    // const wallet_addr = config.wallet_addr;
    // const wallet_pkey = config.wallet_pkey;
    var web3 = new Web3();
    web3.setProvider(new Web3.providers.HttpProvider(provider_url));

    var contract = web3.eth.contract(abi).at(address);
    // var contstantInstance = contract.deploy({from:"0xe8798c379d5ca8b3ac3bfeb354c7a70884206e5d"});
    // engine.start();
    // contract.checkProgress.call(
    //     function(error, result){

    //         if(error || !result) {
    //             res.send({time: Date.now(), address: web3.eth.coinbase, result: error });
    //         }else{
    //             res.send({time: Date.now(), address: web3.eth.coinbase, tx: result, result: 'ok' });
    //         }

    //     }
    // );

    contract.init.sendTransaction("0x71646187A74A4C1471d3C5923b11cc5f0a68024F", web3.eth.coinbase, 
        {from: web3.eth.coinbase},
        function(error, result) {
            if(error || !result) {
                res.send({time: Date.now(), address: "0xe8798c379d5ca8b3ac3bfeb354c7a70884206e5d", result: error });
            }else{
                res.send({time: Date.now(), address: "0xe8798c379d5ca8b3ac3bfeb354c7a70884206e5d", tx: result, result: 'ok' });
            }
        });
});


module.exports = router;
