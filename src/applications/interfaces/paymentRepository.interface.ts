import { Payment } from 'src/modules/payment/payment';
import { IGenericRepository } from './genricRepository.interface';
import { PaymentModel } from 'src/infrastructure/dataAccess/models/payment.entity';

export interface IPaymentRepository
  extends IGenericRepository<Payment, PaymentModel> {
  getAllPaymentList(): Promise<Payment[]>;
}
