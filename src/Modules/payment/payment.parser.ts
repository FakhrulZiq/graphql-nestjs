import { extractDateFromISOString } from 'src/utilities/utils';
import { Payment } from './Payment';
import { IPaymentList } from 'src/applications/interfaces/paymentService.interface';

export class PaymentParser {
  static paymentList(payments: Payment[]): IPaymentList[] {
    const data = payments.map((payment: Payment) => {
      return {
        instalmentId: payment.instalmentId,
        date: extractDateFromISOString(payment.paymentDate),
        amount: payment.paymentAmount,
        method: payment.paymentMethod,
        status: payment.paymentStatus,
        transactionId: payment.transactionId,
      };
    });
    return data;
  }
}
