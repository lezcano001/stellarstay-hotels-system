import { ILogger } from "../common/logger.port";

export class PaymentService {
  constructor(
    private logger: ILogger,
  ) {}
  async charge(params: {
    amount: number;
    currency: string;
    source: string;
  }) {
    this.logger.info('PaymentService - charge called with:', params);
    
    return new Promise<{ success: boolean; transactionId: string }>((resolve) => {
      // Simulate payment processing delay
      setTimeout(() => {
        resolve({ success: true, transactionId: 'txn_123456789' });
      }, 500);
    })
  }
}