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
                                        "name": "",
                                        "type": "address"
                                }
                        ],
                        "name": "balanceOf",
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
                                        "internalType": "uint256",
                                        "name": "",
                                        "type": "uint256"
                                }
                        ],
                        "name": "contacts",
                        "outputs": [
                                {
                                        "internalType": "uint256",
                                        "name": "id",
                                        "type": "uint256"
                                },
                                {
                                        "internalType": "string",
                                        "name": "name",
                                        "type": "string"
                                },
                                {
                                        "internalType": "string",
                                        "name": "phone",
                                        "type": "string"
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
                                        "internalType": "string",
                                        "name": "_name",
                                        "type": "string"
                                },
                                {
                                        "internalType": "string",
                                        "name": "_phone",
                                        "type": "string"
                                }
                        ],
                        "name": "createContact",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                },
                {
                        "inputs": [],
                        "name": "getBalance",
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
                                        "internalType": "address payable",
                                        "name": "_to",
                                        "type": "address"
                                },
                                {
                                        "internalType": "uint256",
                                        "name": "_amount",
                                        "type": "uint256"
                                }
                        ],
                        "name": "sendViaCall",
                        "outputs": [],
                        "stateMutability": "payable",
                        "type": "function"
                },
                {
                        "inputs": [
                                {
                                        "internalType": "address",
                                        "name": "_to",
                                        "type": "address"
                                },
                                {
                                        "internalType": "uint256",
                                        "name": "_value",
                                        "type": "uint256"
                                }
                        ],
                        "name": "transfer",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                }
        ], '0xC33838a7e408E671a16a7290A5D8bbF0C42bFd31');
        routes(app, bdd, accounts, contactList);

        app.listen(process.env.PORT || 3001, () => {
                console.log('listening on port '+ (process.env.PORT || 3001));
        });
});