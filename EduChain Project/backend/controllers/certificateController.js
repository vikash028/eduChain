import { addBlock, getChain, findBlockById } from '../models/blockchain.js';

// Add a new certificate to the blockchain
export const addCertificate = (req, res) => {
  try {
    const certificateData = req.body;
    
    // Validate input
    if (!certificateData.recipient || !certificateData.course || !certificateData.issueDate) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields' 
      });
    }

    // Add the certificate to the blockchain
    const newBlock = addBlock(certificateData);
    
    res.status(201).json({
      success: true,
      message: 'Certificate added successfully',
      blockId: newBlock.id,
      timestamp: newBlock.timestamp
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to add certificate',
      error: error.message
    });
  }
};

// Get the entire blockchain
export const getBlockchain = (req, res) => {
  try {
    const blockchain = getChain();
    
    res.status(200).json({
      success: true,
      chain: blockchain
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve blockchain',
      error: error.message
    });
  }
};

// Verify a certificate by ID
export const verifyCertificate = (req, res) => {
  try {
    const id = req.params.id;
    
    // Find the certificate in the blockchain
    const block = findBlockById(id);
    
    if (!block) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Certificate verified successfully',
      certificate: block
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to verify certificate',
      error: error.message
    });
  }
};