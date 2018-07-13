const SHA256 = require("../node_modules/crypto-js/sha256");

export default class Block {
    constructor(transactions, previous_hash){
        this.timestamp = Date.now();
        this.transactions = transactions;
        this.previous_hash = previous_hash;
        this.hash = this.generateHash();
        this.nonce = 0;
    }

    generateHash(){
        return SHA256(this.timestamp + JSON.stringify(this.transactions).toString() + this.previous_hash + this.nonce).toString();
    }
    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce ++;
            this.hash = this.generateHash();
        }
    }
}