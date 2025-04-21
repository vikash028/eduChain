import CryptoJS from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';

// Simple blockchain implementation
class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.id = uuidv4();
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return CryptoJS.SHA256(
      this.index + 
      this.timestamp + 
      JSON.stringify(this.data) + 
      this.previousHash
    ).toString();
  }
}

class Blockchain {
  constructor() {
    // Initialize the chain with the genesis block
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, new Date().toISOString(), {
      recipient: 'Genesis',
      course: 'Genesis Block',
      issueDate: new Date().toISOString(),
      issuer: 'EduChain'
    }, '0');
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(data) {
    const latestBlock = this.getLatestBlock();
    const newBlock = new Block(
      latestBlock.index + 1,
      new Date().toISOString(),
      data,
      latestBlock.hash
    );
    
    this.chain.push(newBlock);
    return newBlock;
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      // Validate hash
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      // Validate previous hash reference
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }

  findBlockById(id) {
    return this.chain.find(block => block.id === id);
  }
}

// Create a singleton instance
const eduChain = new Blockchain();

// Export functions to interact with the blockchain
export const addBlock = (data) => {
  return eduChain.addBlock(data);
};

export const getChain = () => {
  return eduChain.chain;
};

export const isChainValid = () => {
  return eduChain.isChainValid();
};

export const findBlockById = (id) => {
  return eduChain.findBlockById(id);
};