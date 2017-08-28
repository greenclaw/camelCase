var express = require('express');

const Web3 = require('web3');

const contract_config = require("../contracts/contract");
const config =   require("../contracts/config");

const provider_url = config.provider_url;
const wallet_addr = config.wallet_addr;
const wallet_pkey = config.wallet_pkey;

const address = contract_config.address;
const abi = contract_config.abi;

var contractsRouter = express.Router({mergeParams: true});


contractsRouter.get("/", function(req, res) {
    res.send({text: "Contracts route", status: 400});
});

contractsRouter.get("/init", function(req, res) {

    const producer_address = "0x71646187A74A4C1471d3C5923b11cc5f0a68024F";
    const customer_address = web3.eth.coinbase;
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

    contract.init.sendTransaction(producer_address, customer_address, {from: customer_address},
        function(error, result) {
            if(error || !result) {
                res.send({time: Date.now(), address: customer_address, result: error });
            }else{
                res.send({time: Date.now(), address: customer_address, tx: result, result: 'ok' });
            }
        });
});



contractsRouter.param("contractId", function(req, res, next, contractId) {
    console.log('doing name validations on ' + contractId);

    // once validation is done save the new item in the req
    req.contractId = contractId;
    // go to the next thing
    next(); 
});



contractsRouter.get("/:contractId", function(req, res) {
    res.send({text: "User contract route", contractId: req.query.contractId});
});

module.exports = contractsRouter;