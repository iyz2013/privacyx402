/**
 * Basic Usage Example
 * 
 * Shows how to process a privacy payment
 */

import { createPrivacyProcessor } from '../dist/index.js';
import dotenv from 'dotenv';

dotenv.config();

async function main() {
  // Configure processor
  const processor = createPrivacyProcessor({
    rpcUrl: process.env.SOLANA_RPC_URL,
    treasuryWallet: process.env.TREASURY_WALLET,
    userPrivateKey: process.env.USER_PRIVATE_KEY
  });

  console.log('Processing privacy payment...\n');

  // Execute privacy payment
  const result = await processor.processPayment(0.001);

  if (result.success) {
    console.log('SUCCESS!');
    console.log('Deposit Signature:', result.depositSignature);
    console.log('Amount Sent:', result.amountSent, 'SOL');
    console.log('Fee:', result.fee, 'SOL');
    console.log('Treasury:', result.treasury);
    console.log('\nPayment is private - deposit and withdrawal are unlinked on-chain!');
  } else {
    console.error('FAILED:', result.message);
  }
}

main().catch(console.error);

