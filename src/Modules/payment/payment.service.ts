import { Inject, Injectable } from '@nestjs/common';
import { CRUD_ACTION, TYPES } from 'src/applications/constant';
import { IAudit } from 'src/applications/interfaces/audit.interface';
import { IPaymentRepository } from 'src/applications/interfaces/paymentRepository.interface';
import {
  IBillplzBillCallback,
  IPaymentList,
  IPaymentService,
} from 'src/applications/interfaces/paymentService.interface';
import { Audit } from 'src/domain/audit/audit';
import { IBillplzService } from 'src/infrastructure/billplz/interface/billplzService.interface';
import { IContextAwareLogger } from 'src/infrastructure/logger';
import { applicationError } from 'src/utilities/exceptionInstance';
import { Payment } from './payment';
import { PaymentParser } from './payment.parser';

@Injectable()
export class PaymentService implements IPaymentService {
  constructor(
    @Inject(TYPES.IPaymentRepository)
    private readonly _paymentRepository: IPaymentRepository,
    @Inject(TYPES.IBillplzService)
    private readonly _billplzService: IBillplzService,
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

  async handlePaymentCallback(
    callback: IBillplzBillCallback,
  ): Promise<boolean> {
    const getBill: IBillplzBillCallback =
      await this._billplzService.getBillStatus(callback.id);

    const auditProps: IAudit = Audit.createAuditProperties(
      getBill.name,
      CRUD_ACTION.create,
    );
    const audit: Audit = Audit.create(auditProps).getValue();

    const savedPayment = Payment.create({
      instalmentId: getBill.reference_1,
      paymentAmount: Number(getBill.paid_amount),
      paymentDate: getBill.paid_at,
      paymentStatus: getBill.state,
      paymentMethod: 'FPX',
      transactionId: getBill.id,
      audit,
    }).getValue();

    const payment = await this._paymentRepository.save(savedPayment);

    if (!payment) {
      throw applicationError(`Something went wrong when try to save payment`);
    }

    return true; // Return success
  }
}
