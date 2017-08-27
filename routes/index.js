var express = require('express');
var router = express.Router();
const Web3 = require('web3');
const ProviderEngine = require('web3-provider-engine');
const Web3Subprovider = require("web3-provider-engine/subproviders/web3.js");
const WalletSubprovider = require('web3-provider-engine/subproviders/wallet.js');
const EthereumWallet = require('ethereumjs-wallet');

const provider_url = 'http://hackaton.izx.io:18555';
const wallet_addr = '0xe8798c379d5ca8b3ac3bfeb354c7a70884206e5d';
const wallet_pkey = 'f07743ca2985cdd9cedd61ec393366c3d0147dc2cef1758234c1427700347c9a';


var usersRouter = express.Router();
var contractsRouter = express.Router({mergeParams: true});


// usersRouter.route("/")
//     .get(function(res, req) {
//         res.send({text: "Users route", status: 400});
//     });



contractsRouter.get("/", function(req, res) {
    res.send({text: "Contracts route", status: 400});
});

contractsRouter.get("/:contractId", function(req, res) {
    res.send({text: "User contract route", contractId: req.query.contractId});
});

contractsRouter.param("contractId", function(req, res, next, contractId) {
    console.log('doing name validations on ' + contractId);

    // once validation is done save the new item in the req
    req.contractId = contractId;
    // go to the next thing
    next(); 
});

contractsRouter.post("/init", function(req, res) {

    var sender_address = req.body.senderAddress;
    var provider_address = req.body.providerAddress;
    var conditions_number = req.body.conditionNumber;
    var contract_type = req.body.contractType;
    var contract = require("../contracts/contract2.js");

    if (!contract_type) {
        res.send({error: "Contract type missing!"});
    }

    // switch (contract_type) {
    //     case "FIRST":
    //         contract = require("../contracts/contract1.js");
    //         break;
    //     case "SECOND":
    //         contract = require("../contracts/contract2.js");
    //         break;
    // }

    if (!contact) {
        res.send({error: "Contract missing", contract: contract });
    }

    var contract = web3.contract.abi(contract.abi).at(contract.address);


    if (!(sender_address && provider_address)) {
        res.send({  time: Date.now(), 
                    senderAddress: sender_address,
                    prodviderAddress: provider_address,
                    result: error });
    } else {

    }
});

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
    console.log(userId);
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


router.use("/users", usersRouter);

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render( 'index', { title: 'Hackathon', default_addr: wallet_addr } );
});


module.exports = router;




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


// router.post('/send', function(req, res){

//     var address = req.body.address;
//     var amount = req.body.amount;

//     if(!address){
//         res.send({time: Date.now(), address: address, result: 'Адрес не указан', state: 'warning' });
//         return;
//     }else if(!amount || amount > 10){
//         res.send({time: Date.now(), address: address, result: 'Сумма неверная', state: 'warning'  });
//         return;
//     }

//     const wallet = EthereumWallet.fromPrivateKey(Buffer.from(wallet_pkey, 'hex'));
//     const engine = new ProviderEngine();
//     engine.addProvider(new WalletSubprovider(wallet, {}));
//     engine.addProvider(new Web3Subprovider(new Web3.providers.HttpProvider(provider_url)));

//     engine.start();
//     const web3 = new Web3(engine);

//     web3.eth.sendTransaction( { from: wallet.getAddressString(), to: address, value: web3.toWei(amount), gas: '100000'},
//         function(error, result){
//             console.log(error, result);

//             if(error || !result) {
//                 res.send({time: Date.now(), address: address, result: error });
//             }else{
//                 res.send({time: Date.now(), address: address, tx: result, result: 'ok' });
//             }

//             engine.stop();
//         }
//     );
// });
