import { Injectable } from '@nestjs/common';
import { IMapper } from 'src/applications/interfaces/mapper.interface';
import { AuditMapper } from 'src/domain/audit/audit.mapper';
import { InstalmentScheduleModel } from 'src/infrastructure/dataAccess/models/instalmentSchedule.entity';
import { LoanModel } from 'src/infrastructure/dataAccess/models/Loan.entity';
import { InstalmentSchedule } from '../InstalmentSchedule/InstalmentSchedule';
import { InstalmentScheduleMapper } from '../InstalmentSchedule/InstalmentSchedule.mapper';
import { Loan } from '../Loan/Loan';

@Injectable()
export class LoanMapper implements IMapper<Loan, LoanModel> {
  constructor(
    private readonly _instalmentSchedulesMapper: InstalmentScheduleMapper,
  ) {}
  toPersistence(entity: Loan): LoanModel {
    const {
      loanAmount,
      totalInstalments,
      outStandingAmount,
      loanStartDate,
      loanStatus,
      remark,
      proofLink,
      borrowerId,
      instalmentSchedules,
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

    let instalmentScheduleModels: InstalmentScheduleModel[];

    if (instalmentSchedules?.length > 0) {
      instalmentScheduleModels = instalmentSchedules.map((instalmentSchedule) =>
        this._instalmentSchedulesMapper.toPersistence(instalmentSchedule),
      );
    }

    const model: LoanModel = {
      id: entity.id,
      loanAmount,
      totalInstalments,
      outStandingAmount,
      loanStartDate,
      loanStatus,
      remark,
      proofLink,
      borrowerId,
      instalmentSchedules: instalmentScheduleModels,
      auditCreatedBy,
      auditCreatedDateTime,
      auditDeletedBy,
      auditDeletedDateTime,
      auditModifiedBy,
      auditModifiedDateTime,
    };
    return model;
  }

  toDomain(model: LoanModel): Loan {
    const {
      id,
      loanAmount,
      totalInstalments,
      outStandingAmount,
      loanStartDate,
      loanStatus,
      remark,
      proofLink,
      borrowerId,
      instalmentSchedules,
    } = model;

    let instalmentScheduleDetails: InstalmentSchedule[];

    if (instalmentSchedules?.length > 0) {
      instalmentScheduleDetails = instalmentSchedules.map(
        (instalmentSchedule) =>
          this._instalmentSchedulesMapper.toDomain(instalmentSchedule),
      );
    }

    return Loan.create(
      {
        loanAmount,
        totalInstalments,
        outStandingAmount,
        loanStartDate,
        loanStatus,
        remark,
        proofLink,
        borrowerId,
        instalmentSchedules: instalmentScheduleDetails,
        audit: new AuditMapper().toDomain(model),
      },
      id,
    ).getValue();
  }
}
