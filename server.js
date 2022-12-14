const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes');
const Web3 = require('web3');
const mongodb = require('mongodb').MongoClient;
const contract = require('@truffle/contract');
const artifacts = require('./build/contracts/Contacts.json');
const CONTACT_ABI = require('./config');
const CONTACT_ADDRESS = require('./config');

app.use(cors());
app.use(express.json());

if (typeof web3 !== 'undefined') {
        var web3 = new Web3(web3.currentProvider); 
} else {
        var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
}

mongodb.connect('mongodb://127.0.0.1:27017/blockchain-node-api',
        {
                useUnifiedTopology: true,
        }, async (err, client) => {
                if (err) return console.log(err);
        const bdd =client.db('Cluster0');
        const accounts = await web3.eth.getAccounts();
        console.log(CONTACT_ABI.CONTACT_ADDRESS);
        const contactList = new web3.eth.Contract([
                {
                        "inputs": [
                                {
                                        "internalType": "address",
                                        "name": "_seller",
                                        "type": "address"
                                },
                                {
                                        "internalType": "address",
                                        "name": "_buyer",
                                        "type": "address"
                                },
                                {
                                        "internalType": "uint256",
                                        "name": "_valueCo2",
                                        "type": "uint256"
                                },
                                {
                                        "internalType": "uint256",
                                        "name": "_valueKwatt",
                                        "type": "uint256"
                                },
                                {
                                        "internalType": "uint256",
                                        "name": "_valueEuro",
                                        "type": "uint256"
                                }
                        ],
                        "name": "confirmation",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                },
                {
                        "anonymous": false,
                        "inputs": [
                                {
                                        "indexed": true,
                                        "internalType": "address",
                                        "name": "_seller",
                                        "type": "address"
                                },
                                {
                                        "indexed": true,
                                        "internalType": "address",
                                        "name": "_buyer",
                                        "type": "address"
                                },
                                {
                                        "indexed": false,
                                        "internalType": "uint256",
                                        "name": "_valueCo2",
                                        "type": "uint256"
                                },
                                {
                                        "indexed": false,
                                        "internalType": "uint256",
                                        "name": "_valueKwatt",
                                        "type": "uint256"
                                },
                                {
                                        "indexed": false,
                                        "internalType": "uint256",
                                        "name": "_valueEuro",
                                        "type": "uint256"
                                }
                        ],
                        "name": "Confirmation",
                        "type": "event"
                },
                {
                        "inputs": [
                                {
                                        "internalType": "address",
                                        "name": "add1",
                                        "type": "address"
                                },
                                {
                                        "internalType": "address",
                                        "name": "add2",
                                        "type": "address"
                                },
                                {
                                        "internalType": "uint256",
                                        "name": "value",
                                        "type": "uint256"
                                }
                        ],
                        "name": "sendEthForKwatt",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                },
                {
                        "inputs": [
                                {
                                        "internalType": "address",
                                        "name": "add",
                                        "type": "address"
                                },
                                {
                                        "internalType": "uint256",
                                        "name": "value",
                                        "type": "uint256"
                                }
                        ],
                        "name": "setCo2",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                },
                {
                        "inputs": [
                                {
                                        "internalType": "address",
                                        "name": "add",
                                        "type": "address"
                                },
                                {
                                        "internalType": "uint256",
                                        "name": "value",
                                        "type": "uint256"
                                }
                        ],
                        "name": "setKwatt",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                },
                {
                        "inputs": [
                                {
                                        "internalType": "address",
                                        "name": "",
                                        "type": "address"
                                }
                        ],
                        "name": "co2",
                        "outputs": [
                                {
                                        "internalType": "uint256",
                                        "name": "",
                                        "type": "uint256"
                                }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                },
                {
                        "inputs": [],
                        "name": "count",
                        "outputs": [
                                {
                                        "internalType": "uint256",
                                        "name": "",
                                        "type": "uint256"
                                }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                },
                {
                        "inputs": [
                                {
                                        "internalType": "address",
                                        "name": "add",
                                        "type": "address"
                                }
                        ],
                        "name": "getCo2",
                        "outputs": [
                                {
                                        "internalType": "uint256",
                                        "name": "",
                                        "type": "uint256"
                                }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                },
                {
                        "inputs": [
                                {
                                        "internalType": "address",
                                        "name": "add",
                                        "type": "address"
                                }
                        ],
                        "name": "getKwatt",
                        "outputs": [
                                {
                                        "internalType": "uint256",
                                        "name": "",
                                        "type": "uint256"
                                }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                },
                {
                        "inputs": [],
                        "name": "getSender",
                        "outputs": [
                                {
                                        "internalType": "address",
                                        "name": "",
                                        "type": "address"
                                }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                },
                {
                        "inputs": [
                                {
                                        "internalType": "address",
                                        "name": "",
                                        "type": "address"
                                }
                        ],
                        "name": "kwatt",
                        "outputs": [
                                {
                                        "internalType": "uint256",
                                        "name": "",
                                        "type": "uint256"
                                }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                }
        ], "0x6fb62b22b23c803C7aE061b916989062820223b1");
       
        routes(app, bdd, accounts, contactList);

       

        app.listen(process.env.PORT || 3001, () => {
                console.log('listening on port '+ (process.env.PORT || 3001));
        });
});