const Web3 = require('web3');

if (typeof web3 !== 'undefined') {
  var web3 = new Web3(web3.currentProvider); 
} else {
  var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
}

function routes(app, db, accounts, contactList) {
 /*   app.get('/contacts', async (request, response) => {
            let cache = [];
       
            const COUNTER = await contactList.methods.count().call();
  
            for (let i = 1; i <= COUNTER; i++) {
  const contact = await contactList.methods.contacts(i).call();
  cache = [...cache, contact];
} 
response.json(cache);
});*/

app.post('/amount', async (request, response) => {

//await contactList.methods.sendViaCall(request.query.to, request.query.amount).call()
//await contactList.methods.send(request.query.to).send({ from: request.query.from, value: request.query.amount });

contactList.methods.confirmation(request.body.from,request.body.to,"1383","70000","1500").call();

/*web3.eth.sendTransaction({
  from:request.body.from,
  to: request.body.from,
  value: web3.utils.toWei(1, 'ether'),
}, function(err, transactionHash) {
  if (err) { 
      console.log(err); 
  } else {
      console.log(transactionHash);
  }
});
}*/
});


app.get('/address', async (request, response) => {

  let cache = [];
  
  for (let i = 0; i < accounts.length; i++) {
    const address = accounts[i];
  
    cache = [...cache,address];
  }
  response.json(cache);

});

}

module.exports = routes