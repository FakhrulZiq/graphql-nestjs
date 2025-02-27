import { Injectable } from '@nestjs/common';
import { IMapper } from 'src/applications/interfaces/mapper.interface';
import { AuditMapper } from 'src/domain/audit/audit.mapper';
import { InstalmentScheduleModel } from 'src/infrastructure/dataAccess/models/InstalmentSchedule.entity';
import { InstalmentSchedule } from '../InstalmentSchedule/InstalmentSchedule';

@Injectable()
export class InstalmentScheduleMapper
  implements IMapper<InstalmentSchedule, InstalmentScheduleModel>
{
  toPersistence(entity: InstalmentSchedule): InstalmentScheduleModel {
    const { instalmentNumber, amountDue, dueDate, status, loanId, audit } =
      entity;

    const {
      auditCreatedBy,
      auditCreatedDateTime,
      auditDeletedBy,
      auditDeletedDateTime,
      auditModifiedBy,
      auditModifiedDateTime,
    } = audit;

    const model: InstalmentScheduleModel = {
      id: entity.id,
      instalmentNumber,
      amountDue,
      dueDate,
      status,
      loanId,
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
    const { id, instalmentNumber, amountDue, dueDate, status, loanId } = model;

    return InstalmentSchedule.create(
      {
        instalmentNumber,
        amountDue,
        dueDate,
        status,
        loanId,
        audit: new AuditMapper().toDomain(model),
      },
      id,
    ).getValue();
  }
}
