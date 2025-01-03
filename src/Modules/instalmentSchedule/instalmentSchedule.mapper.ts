import { Injectable } from '@nestjs/common';
import { IMapper } from 'src/applications/interfaces/mapper.interface';
import { AuditMapper } from 'src/domain/audit/audit.mapper';
import { InstalmentScheduleModel } from 'src/infrastructure/dataAccess/models/InstalmentSchedule.entity';
import { LoanModel } from 'src/infrastructure/dataAccess/models/Loan.entity';
import { InstalmentSchedule } from '../InstalmentSchedule/InstalmentSchedule';
import { Loan } from '../Loan/Loan';
import { LoanMapper } from '../Loan/Loan.mapper';

@Injectable()
export class InstalmentScheduleMapper
  implements IMapper<InstalmentSchedule, InstalmentScheduleModel>
{
  constructor(private readonly _loanMapper: LoanMapper) {}
  toPersistence(entity: InstalmentSchedule): InstalmentScheduleModel {
    const {
      instalmentNumber,
      amountDue,
      dueDate,
      status,
      loanId,
      loan,
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

    let loanModel: LoanModel;

    if (loan) {
      loanModel = this._loanMapper.toPersistence(loan);
    }

    const model: InstalmentScheduleModel = {
      id: entity.id,
      instalmentNumber,
      amountDue,
      dueDate,
      status,
      loanId,
      loan: loanModel,
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
    const { id, instalmentNumber, amountDue, dueDate, status, loanId, loan } =
      model;

    let loanDetail: Loan;

    if (loan) {
      loanDetail = this._loanMapper.toDomain(loan);
    }

    return InstalmentSchedule.create(
      {
        instalmentNumber,
        amountDue,
        dueDate,
        status,
        loanId,
        loan: loanDetail,
        audit: new AuditMapper().toDomain(model),
      },
      id,
    ).getValue();
  }
}
