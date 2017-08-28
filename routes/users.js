var express = require('express');

const Web3 = require('web3');
const ProviderEngine = require('web3-provider-engine');
const Web3Subprovider = require("web3-provider-engine/subproviders/web3.js");
const WalletSubprovider = require('web3-provider-engine/subproviders/wallet.js');
const EthereumWallet = require('ethereumjs-wallet');

var contractsRouter = require("./contracts");

var config = require("../contracts/config");

const provider_url = config.provider_url;
const wallet_addr = config.wallet_addr;
const wallet_pkey = config.wallet_pkey;

var usersRouter = express.Router();

// usersRouter.route("/")
//     .get(function(res, req) {
//         res.send({text: "Users route", status: 400});
//     });


usersRouter.param('userId', function(req, res, next, userId) {
    // do validation on name here
    // blah blah validation
    // log something so we know its working
    console.log('doing name validations on ' + userId);

    // once validation is done save the new item in the req
    req.userId = userId;
    // go to the next thing
    next(); 
});


usersRouter.get("/:userId", function(req, res) {
    var userId = req.userId;
    console.log("prov url" + provider_url);
    res.send({userId: userId});
});


usersRouter.get("/:userId/balance", function(req, res){
    var address = req.query.address;
    var user_id = req.query.userId;
    const web3 = new Web3(new Web3.providers.HttpProvider(provider_url));

    web3.eth.getBalance(address,
        function(error, result){
            console.log(error, result);
            if(error || !result) {
                res.send({time: Date.now(), userId: user_id, address: address, balance: error, state: 'danger'  });
            }else{
                var balance = web3.fromWei(result);
                res.send({time: Date.now(), userId: user_id, address: address, balance: balance, state: 'success'  });
            }
        }
    );
});

usersRouter.use("/:userId/contracts", contractsRouter);


module.exports = usersRouter;

