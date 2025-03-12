import { Injectable } from '@nestjs/common';
import { IMapper } from 'src/applications/interfaces/mapper.interface';
import { AuditMapper } from 'src/domain/audit/audit.mapper';
import { PaymentModel } from 'src/infrastructure/dataAccess/models/payment.entity';
import { Payment } from './payment';

@Injectable()
export class PaymentMapper implements IMapper<Payment, PaymentModel> {
  toPersistence(entity: Payment): PaymentModel {
    const {
      instalmentId,
      transactionId,
      paymentAmount,
      paymentDate,
      paymentMethod,
      paymentStatus,
      audit,
    } = entity;

    const {
      auditCreatedBy,
      auditCreatedDateTime,
      auditDeletedBy,
      auditDeletedDateTime,
      auditModifiedBy,
      auditModifiedDateTime,
    } = audit;

    const model: PaymentModel = {
      id: entity.id,
      instalmentId,
      transactionId,
      paymentAmount,
      paymentDate,
      paymentMethod,
      paymentStatus,
      auditCreatedBy,
      auditCreatedDateTime,
      auditDeletedBy,
      auditDeletedDateTime,
      auditModifiedBy,
      auditModifiedDateTime,
    };
    return model;
  }

  toDomain(model: PaymentModel): Payment {
    const {
      id,
      instalmentId,
      transactionId,
      paymentAmount,
      paymentDate,
      paymentMethod,
      paymentStatus,
    } = model;

    return Payment.create(
      {
        instalmentId,
        transactionId,
        paymentAmount,
        paymentDate,
        paymentMethod,
        paymentStatus,
        audit: new AuditMapper().toDomain(model),
      },
      id,
    ).getValue();
  }
}
