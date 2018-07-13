import Block from './Block.js'; 
import Transaction from './Transaction.js';

export default class BlockChain {
    constructor(data) {
        this.chain = [this.createGenesisBlock(data)];
        this.difficulty = 4;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }
    createGenesisBlock(data){
        return new Block(0, data, "0");
    }
    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }
    getPreviousHash(){
        return this.getLatestBlock().hash;
    }
    getPreviousIndex(){
        return this.getLatestBlock().index;
    }
    addBlock(data){
        var b = new Block(this.getPreviousIndex()+1, data, this.getPreviousHash());
        b.mineBlock(this.difficulty);
        this.chain.push(b); 
    }
    minePendingTransactions(miningRewardAddress){
        let block = new Block(this.pendingTransactions, this.getPreviousHash());
        console.log('Block about to be mined!');
        block.mineBlock();
        console.log('Block successfully mined!');
        this.chain.push(block);
        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];
    }
    createTransaction(transaction){
        this.pendingTransactions.push(transaction);
    }
    getBalanceOfAddress(address){
        let balance = 0;
        for(const bl of this.chain){
            for(const tran of bl.transactions){
                if(tran.fromAddress === address){
                    balance -= tran.ammount;
                }
                if(tran.toAddress === address){
                    balance += tran.ammount;
                }
            }
        }
        return balance;
    }
    isChainValid(){
        for(var i = 1; i < this.chain.length; i++){
            if(!this.hashIsCorrect(i) || !this.previousHashIsCorrect(i)){
                return false;
            }
        }
        return true;
    }
    hashIsCorrect(index){
        return this.chain[index].hash == this.chain[index].generateHash();
    }
    previousHashIsCorrect(index){
        return this.chain[index].previous_hash == this.chain[index - 1].hash;
    }
}


