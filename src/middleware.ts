/**
 * Express Middleware for Privacy Cash 402 Payments
 */

import { Request, Response, NextFunction } from 'express';
import { PrivacyPaymentProcessor } from './index.js';

export interface PaymentMiddlewareConfig {
  rpcUrl: string;
  treasuryWallet: string;
  paymentAmount: number;
  getUserPrivateKey: (req: Request) => Promise<string | null>;
  onPaymentSuccess?: (req: Request, result: any) => void;
  onPaymentFailure?: (req: Request, error: Error) => void;
}

/**
 * Create 402 payment middleware with Privacy Cash
 * 
 * @param config - Middleware configuration
 * @returns Express middleware function
 */
export function createPaymentMiddleware(config: PaymentMiddlewareConfig) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get user's private key from request
      const userPrivateKey = await config.getUserPrivateKey(req);
      
      if (!userPrivateKey) {
        return res.status(402).json({
          error: 'Payment Required',
          message: 'Private key not provided'
        });
      }

      // Process privacy payment
      const processor = new PrivacyPaymentProcessor({
        rpcUrl: config.rpcUrl,
        treasuryWallet: config.treasuryWallet,
        userPrivateKey
      });

      const result = await processor.processPayment(config.paymentAmount);

      if (result.success) {
        if (config.onPaymentSuccess) {
          config.onPaymentSuccess(req, result);
        }
        next();
      } else {
        if (config.onPaymentFailure) {
          config.onPaymentFailure(req, new Error(result.message));
        }
        res.status(402).json({
          error: 'Payment Failed',
          message: result.message
        });
      }
    } catch (error: any) {
      if (config.onPaymentFailure) {
        config.onPaymentFailure(req, error);
      }
      res.status(500).json({
        error: 'Internal Server Error',
        message: error.message
      });
    }
  };
}

/**
 * Verify payment middleware
 * 
 * Checks if a payment signature is valid
 */
export function createVerifyPaymentMiddleware(config: {
  rpcUrl: string;
  getSignature: (req: Request) => string | null;
}) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const signature = config.getSignature(req);
      
      if (!signature) {
        return res.status(402).json({
          error: 'Payment Required',
          message: 'No payment signature provided'
        });
      }

      // Create processor to verify
      const processor = new PrivacyPaymentProcessor({
        rpcUrl: config.rpcUrl,
        treasuryWallet: '',
        userPrivateKey: ''
      });

      const isValid = await processor.verifyTransaction(signature);

      if (isValid) {
        next();
      } else {
        res.status(402).json({
          error: 'Payment Required',
          message: 'Invalid or unconfirmed payment'
        });
      }
    } catch (error: any) {
      res.status(500).json({
        error: 'Internal Server Error',
        message: error.message
      });
    }
  };
}

