import { Injectable } from '@nestjs/common';
import { IMapper } from 'src/applications/interfaces/mapper.interface';
import { AuditMapper } from 'src/domain/audit/audit.mapper';
import { LoanModel } from 'src/infrastructure/dataAccess/models/Loan.entity';
import { Loan } from '../Loan/Loan';
import { BorrowerModel } from 'src/infrastructure/dataAccess/models/borrower.entity';
import { BorrowerMapper } from '../borrower/borrower.mapper';
import { Borrower } from '../borrower/borrower';

@Injectable()
export class LoanMapper implements IMapper<Loan, LoanModel> {
  constructor(private readonly _borrowerMapper: BorrowerMapper) {}
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
      borrower,
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

    let borrowerModel: BorrowerModel;

    if (borrower) {
      borrowerModel = this._borrowerMapper.toPersistence(borrower);
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
      borrower: borrowerModel,
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
      borrower,
    } = model;

    let borrowerProfile: Borrower;

    if (borrower) {
      borrowerProfile = this._borrowerMapper.toDomain(borrower);
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
        borrower: borrowerProfile,
        audit: new AuditMapper().toDomain(model),
      },
      id,
    ).getValue();
  }
}
