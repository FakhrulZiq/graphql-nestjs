import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TYPES } from 'src/applications/constant';
import { IPaymentRepository } from 'src/applications/interfaces/paymentRepository.interface';
import { IContextAwareLogger } from 'src/infrastructure/logger';
import { Payment } from 'src/Modules/payment/payment';
import { PaymentMapper } from 'src/modules/payment/payment.mapper';
import { Repository } from 'typeorm';
import { PaymentModel } from '../models/payment.entity';
import { GenericSqlRepository } from './generic.repository';

@Injectable()
export class PaymentRepository
  extends GenericSqlRepository<Payment, PaymentModel>
  implements IPaymentRepository
{
  paymentMapper: PaymentMapper;
  constructor(
    @InjectRepository(PaymentModel)
    repository: Repository<PaymentModel>,
    paymentMapper: PaymentMapper,
    @Inject(TYPES.IApplicationLogger)
    private readonly _logger: IContextAwareLogger,
  ) {
    super(repository, paymentMapper);
    this.paymentMapper = paymentMapper;
  }

  async getAllPaymentList(): Promise<Payment[]> {
    try {
      const payments: PaymentModel[] = await this.repository.find();

      if (payments?.length === 0) {
        return null;
      }

      return payments.map((payment: PaymentModel) =>
        this.paymentMapper.toDomain(payment),
      );
    } catch (error) {
      this._logger.error(error.message, error);
      throw error;
    }
  }
}
