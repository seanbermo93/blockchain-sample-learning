import BlockChain from './BlockChain.js';
import Transaction from './Transaction.js';

let bCoin = new BlockChain({"Name": "Sean 0"});
bCoin.createTransaction(new Transaction("address-1", "address-2", 100));
bCoin.createTransaction(new Transaction("address-2", "address-1", 50));

console.log('Starting the miner -- ');
bCoin.minePendingTransactions("address-3");
bCoin.getBalanceOfAddress("address-1");
bCoin.createTransaction(new Transaction("address-2", "address-1", 50));
bCoin.minePendingTransactions("address-3");
bCoin.getBalanceOfAddress("address-1");


// console.log(JSON.stringify(bCoin, null, 4));
// console.log('The chain is valid --- '+bCoin.isChainValid());

// bCoin.chain[1].data = {"ammount": 40};
// console.log('The chain is invalid? --- '+!bCoin.isChainValid());