import { Inject, Injectable } from '@nestjs/common';
import { TYPES } from 'src/applications/constant';
import { IContextAwareLogger } from 'src/infrastructure/logger';
import { IPaymentList, IPaymentService } from 'src/applications/interfaces/paymentService.interface';
import { PaymentParser } from './payment.parser';
import { IPaymentRepository } from 'src/applications/interfaces/paymentRepository.interface';

@Injectable()
export class PaymentService implements IPaymentService {
  constructor(
    @Inject(TYPES.IPaymentRepository)
    private readonly _paymentRepository: IPaymentRepository,
    @Inject(TYPES.IApplicationLogger)
    private readonly _logger: IContextAwareLogger,
  ) {}

  async getPaymentList(): Promise<IPaymentList[]> {
    try {
      const payments = await this._paymentRepository.getAllPaymentList();

      return PaymentParser.paymentList(payments);
    } catch (error) {
      this._logger.error(error.message, error);
      throw error;
    }
  }

  async handlePaymentCallback(data: any): Promise<boolean> {
    console.log('Payment Callback:', data);

    const installmentId = data.installmentId;
    const transactionId = data.transactionId;
    const paymentStatus = data.status === 1 ? 'PAID' : 'FAILED';

    // TODO: Update the installment status in the database
    console.log(`Updating installment ${installmentId} as ${paymentStatus}`);

    return true; // Return success
  }
}
