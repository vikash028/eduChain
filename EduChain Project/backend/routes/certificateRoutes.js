import express from 'express';
import { 
  addCertificate, 
  getBlockchain, 
  verifyCertificate 
} from '../controllers/certificateController.js';

const router = express.Router();

// Add a new certificate to the blockchain
router.post('/addCertificate', addCertificate);

// Get the entire blockchain
router.get('/getBlockchain', getBlockchain);

// Verify a certificate by ID
router.get('/verifyCertificate/:id', verifyCertificate);

export default router;