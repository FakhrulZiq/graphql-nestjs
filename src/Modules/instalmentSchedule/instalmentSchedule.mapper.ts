import { Injectable } from '@nestjs/common';
import { IMapper } from 'src/applications/interfaces/mapper.interface';
import { AuditMapper } from 'src/domain/audit/audit.mapper';
import { InstalmentScheduleModel } from 'src/infrastructure/dataAccess/models/InstalmentSchedule.entity';
import { InstalmentSchedule } from '../InstalmentSchedule/InstalmentSchedule';
import { PaymentMapper } from '../payment/payment.mapper';
import { PaymentModel } from 'src/infrastructure/dataAccess/models/payment.entity';
import { Payment } from '../payment/payment';

@Injectable()
export class InstalmentScheduleMapper
  implements IMapper<InstalmentSchedule, InstalmentScheduleModel>
{
  constructor(
    private readonly _paymentMapper: PaymentMapper,
  ) {}
  toPersistence(entity: InstalmentSchedule): InstalmentScheduleModel {
    const { instalmentNumber, amountDue, dueDate, status, loanId, payments, audit } =
      entity;

    const {
      auditCreatedBy,
      auditCreatedDateTime,
      auditDeletedBy,
      auditDeletedDateTime,
      auditModifiedBy,
      auditModifiedDateTime,
    } = audit;


    let paymentModels: PaymentModel[];

    if (payments?.length > 0) {
      paymentModels = payments.map((payment) =>
        this._paymentMapper.toPersistence(payment),
      );
    }

    const model: InstalmentScheduleModel = {
      id: entity.id,
      instalmentNumber,
      amountDue,
      dueDate,
      status,
      loanId,
      payments: paymentModels,
      auditCreatedBy,
      auditCreatedDateTime,
      auditDeletedBy,
      auditDeletedDateTime,
      auditModifiedBy,
      auditModifiedDateTime,
    };
    return model;
  }

  toDomain(model: InstalmentScheduleModel): InstalmentSchedule {
    const {
      id,
      instalmentNumber,
      amountDue,
      dueDate,
      status,
      payments,
      loanId,
    } = model;


    let paymentDetails: Payment[];

    if (payments?.length > 0) {
      paymentDetails = payments.map((payment) =>
        this._paymentMapper.toDomain(payment),
      );
    }

    return InstalmentSchedule.create(
      {
        instalmentNumber,
        amountDue,
        dueDate,
        status,
        loanId,
        payments: paymentDetails,
        audit: new AuditMapper().toDomain(model),
      },
      id,
    ).getValue();
  }
}
