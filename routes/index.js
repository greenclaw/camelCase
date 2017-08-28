var express = require('express');
var router = express.Router();
const Web3 = require('web3');
const config =   require("../contracts/config");

const provider_url = config.provider_url;
const wallet_addr = config.wallet_addr;
const wallet_pkey = config.wallet_pkey;
// const ProviderEngine = require('web3-provider-engine');
// const Web3Subprovider = require("web3-provider-engine/subproviders/web3.js");
// const WalletSubprovider = require('web3-provider-engine/subproviders/wallet.js');
// const EthereumWallet = require('ethereumjs-wallet');


var usersRouter = require("./users");

router.use("/users", usersRouter);

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



module.exports = router;
