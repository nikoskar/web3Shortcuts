const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

//requires almost all input as buffer data
const ethtx = require("ethereumjs-tx");

pkey = "1".repeat(64); //set this to your pk

const pkeyBuf = new Buffer(pkey, 'hex'); //encoded form of pkey

//store the address of the account no: index
const account = index => {
  return web3.eth.accounts[index];
}

//get the balance of an account
const balance = acc => {
  return web3.fromWei(web3.eth.getBalance(acc), 'ether').toNumber();
}

const sendETH = (senderAddr, recieverAddr, value) => {
  let tx = {
    from: senderAddr,
    to: recieverAddr,
    value: web3.toWei(value, 'ether'),
    gasLimit: 21000,
    gasPrice: 4000, //current value
    nonce: web3.eth.getTransactionCount(senderAddr)
  }
  return web3.eth.sendTransaction(tx);
}

const makeRawTx = (senderAddr, recieverAddr, value) => {
  let raw = {
    from: senderAddr,
    to: recieverAddr,
    value: web3.toHex(web3.toWei(value, 'ether')),
    gasLimit: web3.toHex(21000),
    gasPrice: web3.toHex(4000), //current
    nonce: web3.toHex(web3.getTransactionCount(senderAddr)),
    data: "" //if you need to add stuff here add an arg for makeRawTx
  }

  new tx = new ethtx(raw);
  tx.sign(pkeyBuf);
  tx.serialize().toString('hex');
  web3.eth.sendRawTransaction(`0x${tx.serialize().toString('hex')}` ,
  (error, data) => {
    if(!error) { console.log(data) }
  }
}
