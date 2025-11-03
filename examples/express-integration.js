/**
 * Express Server Integration Example
 * 
 * Shows how to use 402 payment middleware
 */

import express from 'express';
import { createPaymentMiddleware } from '../dist/middleware.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

// Configure payment middleware
const paymentRequired = createPaymentMiddleware({
  rpcUrl: process.env.SOLANA_RPC_URL,
  treasuryWallet: process.env.TREASURY_WALLET,
  paymentAmount: 0.001,
  
  // Extract private key from request
  getUserPrivateKey: async (req) => {
    return req.headers['x-user-private-key'] || req.body.privateKey;
  },

  // Success callback
  onPaymentSuccess: (req, result) => {
    console.log('Payment received:', result.depositSignature);
  },

  // Failure callback
  onPaymentFailure: (req, error) => {
    console.error('Payment failed:', error.message);
  }
});

// Protected endpoint requiring payment
app.get('/premium-content', paymentRequired, (req, res) => {
  res.json({
    message: 'Access granted! This content requires payment.',
    data: 'Premium content here...'
  });
});

// Public endpoint
app.get('/public', (req, res) => {
  res.json({ message: 'Public content - no payment required' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Try accessing /premium-content with payment');
});

