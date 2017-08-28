var express = require('express');

const Web3 = require('web3');

const contract_config = require("../contracts/contract");
const config =   require("../contracts/config");

const provider_url = config.provider_url;
const wallet_addr = config.wallet_addr;
const wallet_pkey = config.wallet_pkey;

const address = contract_config.address;
const abi = contract_config.abi;

var web3 = new Web3();
web3.setProvider(new Web3.providers.HttpProvider(provider_url));

const producer_address = "0x71646187A74A4C1471d3C5923b11cc5f0a68024F";
const customer_address = wallet_addr;

var contract = web3.eth.contract(abi).at(address);

var contractsRouter = express.Router({mergeParams: true});

var users = require("../contracts/user");

contractsRouter.get("/", function(req, res) {
  var done = false;

  // var users = require("../contracts/user");
  users.forEach(function(user) {
      var userId = user.userId;
      if (userId == req.userId) {
          res.send({time: Date.now(), contracts: user.contracts});
          done = true;
          return;
      }
  });
  if (!done)
    res.send({contracts: []})
});

contractsRouter.get("/init", function(req, res) {
    // producer_address:string
    // customer_address:string

    // var users = require("../contracts/user");
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

    var done = false;
    // var users = require("../contracts/user");
    users.forEach(function(user) {
        var userId = user.userId;
        if (userId == req.userId && !done) {
            user.contracts.forEach(function(contractDoc) {
                if (contractDoc.contractId == req.contractId && !done) {
                    done = true;
                    contract.checkProgress.call({}, function(error, result) {
                        if(error || !result) {
                            res.send({time: Date.now(), contract: contractDoc, progress: [0, 1], result: error });
                        }else{
                            res.send({time: Date.now(), contract: contractDoc, progress: result, result: 'ok' });
                        }
                    });
                }
            });
        }
    });
    if (!done) {
        res.send({time: Date.now(),contract: "", progress: [0, 1],  result: "danger" });
    }
});


contractsRouter.get("/:contractId/add_participant", function(req, res) {
    // role:string
    // participant_address:string
    var done = false;

    // var users = require("../contracts/user");
    users.forEach(function(user) {
        var userId = user.userId;
        var role = req.query.role;
        var participant_address = req.query.participant_address;
        
        if (userId == req.userId && !done) {
            user.contracts.forEach(function(contractDoc) {
                if (contractDoc.contractId == req.contractId && !done) {
                    done = true;
                    contract.addParticipant.sendTransaction(role, participant_address, 
                        {from: user.address},
                        function(error, result) {
                            console.log(error);
                            if(error || !result) {
                                res.send({time: Date.now(), result: error });
                            }else{
                                res.send({time: Date.now(), name: result, result: 'ok' });
                            } 
                    });
                }
            });
        }
    });
    if (!done) {
        res.send({time: Date.now(),name: "", result: "danger"});
    }
});

contractsRouter.get("/:contractId/approve", function(req, res) {
    // role:string
    // address:string

    var done = false;
    // var users = require("../contracts/user");
    users.forEach(function(user) {
        // var doctext = req.query.doctext;
        var doctext = "Secret document";
        var userId = user.userId;
        if (userId == req.userId && !done) {
            user.contracts.forEach(function(contractDoc) {
                if (contractDoc.contractId == req.contractId && !done) {
                    done = true;
                    contract.approve.sendTransaction(role, participant_address, doctext, 
                        {from: user.address},
                        function(error, result) {
                            
                            if(error || !result) {
                                res.send({time: Date.now(), result: error });
                            }else{
                                res.send({time: Date.now(), name: result, result: 'ok' });
                            }
                    });
                }
            });
        }
    });  
    if (!done) {
        res.send({time: Date.now(),name: "", result: "danger"});
    }
});


module.exports = contractsRouter;
