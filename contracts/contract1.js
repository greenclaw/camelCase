const contract = {
	"abi": [
		{
			"constant":false,
			"inputs":[],
			"name":"contractDone",
			"outputs":[],
			"payable":false,
			"stateMutability":"nonpayable",
			"type":"function"
		},
		{
			"constant":false,
			"inputs":[],
			"name":"contractNotDone",
			"outputs":[],
			"payable":true,
			"stateMutability":"payable",
			"type":"function"
		},
		{
			"constant":false,
			"inputs":[
				{
					"name":"role",
					"type":"bytes32"
				},
				{
					"name":"addr",
					"type":"address"
				}
			],
			"name":"approve",
			"outputs":[
				{
					"name":"",
					"type":"uint256"
				}
			],
			"payable":false,
			"stateMutability":"nonpayable",
			"type":"function"},{"constant":false,"inputs":[{"name":"role","type":"bytes32"},{"name":"addr","type":"address"}],"name":"addParticipant","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"checkProgress","outputs":[{"name":"","type":"uint256[2]"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"prod","type":"address"},{"name":"cust","type":"address"}],"name":"init","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}],
	"address": "0xf07eae01dc3c0018e8c75491aa6cddf508c21c660abe85c622ed3c574f4cc2af"
}

module.exports = contract;