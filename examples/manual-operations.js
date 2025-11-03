/**
 * Manual Operations Example
 * 
 * Shows individual deposit, withdraw, and balance operations
 */

import { createPrivacyProcessor } from '../dist/index.js';
import dotenv from 'dotenv';

dotenv.config();

async function main() {
  const processor = createPrivacyProcessor({
    rpcUrl: process.env.SOLANA_RPC_URL,
    treasuryWallet: process.env.TREASURY_WALLET,
    userPrivateKey: process.env.USER_PRIVATE_KEY
  });

  console.log('Example: Manual Privacy Cash Operations\n');

  // Check initial balance
  console.log('1. Checking private balance...');
  let balance = await processor.getPrivateBalance();
  console.log(`   Balance: ${balance.sol} SOL\n`);

  // Deposit
  console.log('2. Depositing 0.001 SOL...');
  const depositSig = await processor.deposit(0.001);
  console.log(`   Deposit signature: ${depositSig}\n`);

  // Check balance after deposit
  console.log('3. Checking balance after deposit...');
  balance = await processor.getPrivateBalance();
  console.log(`   Balance: ${balance.sol} SOL\n`);

  // Withdraw to treasury
  console.log('4. Withdrawing to treasury privately...');
  const withdrawResult = await processor.withdraw(
    0.001,
    process.env.TREASURY_WALLET
  );
  console.log(`   Amount sent: ${withdrawResult.amountSent} SOL`);
  console.log(`   Fee: ${withdrawResult.fee} SOL\n`);

  // Final balance
  console.log('5. Final balance...');
  balance = await processor.getPrivateBalance();
  console.log(`   Balance: ${balance.sol} SOL\n`);

  console.log('Complete! Check transactions on Solscan - they are unlinked.');
}

main().catch(console.error);

