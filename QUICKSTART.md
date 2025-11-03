# Quick Start Guide

## Installation

```bash
npm install privacy-cash-402-sdk
```

## Configuration

Create `.env` file:

```env
SOLANA_RPC_URL=https://mainnet.helius-rpc.com/?api-key=YOUR_KEY
TREASURY_WALLET=YOUR_TREASURY_PUBLIC_KEY
USER_PRIVATE_KEY=USER_PRIVATE_KEY_BASE58
```

## Basic Payment

```typescript
import { createPrivacyProcessor } from 'privacy-cash-402-sdk';

const processor = createPrivacyProcessor({
  rpcUrl: process.env.SOLANA_RPC_URL,
  treasuryWallet: process.env.TREASURY_WALLET,
  userPrivateKey: process.env.USER_PRIVATE_KEY
});

const result = await processor.processPayment(0.001);
console.log('Success:', result.success);
```

## Express Integration

```typescript
import express from 'express';
import { createPaymentMiddleware } from 'privacy-cash-402-sdk';

const app = express();

const paymentRequired = createPaymentMiddleware({
  rpcUrl: process.env.SOLANA_RPC_URL,
  treasuryWallet: process.env.TREASURY_WALLET,
  paymentAmount: 0.001,
  getUserPrivateKey: async (req) => req.body.privateKey
});

app.get('/premium', paymentRequired, (req, res) => {
  res.json({ message: 'Access granted' });
});

app.listen(3001);
```

## Testing

```bash
# Run basic example
npm run example

# Check examples directory for more
node examples/express-integration.js
node examples/manual-operations.js
```

## Next Steps

1. Review README.md for full API documentation
2. Check examples/ directory for more use cases
3. Read CONTRIBUTING.md to contribute
4. See CHANGELOG.md for version history

## Support

- GitHub Issues
- Documentation
- Examples

