import { Injectable } from '@nestjs/common';
import { Borrower } from './borrower';
import { BorrowerModel } from 'src/infrastructure/dataAccess/models/borrower.entity';
import { IMapper } from 'src/applications/interfaces/mapper.interface';
import { AuditMapper } from 'src/domain/audit/audit.mapper';
import { LoanModel } from 'src/infrastructure/dataAccess/models/loan.entity';
import { LoanMapper } from '../Loan/Loan.mapper';
import { Loan } from '../Loan/Loan';

@Injectable()
export class BorrowerMapper implements IMapper<Borrower, BorrowerModel> {
  constructor(private readonly _loanMapper: LoanMapper) {}
  toPersistence(entity: Borrower): BorrowerModel {
    const { name, phoneNumber, loans, audit } = entity;

    const {
      auditCreatedBy,
      auditCreatedDateTime,
      auditDeletedBy,
      auditDeletedDateTime,
      auditModifiedBy,
      auditModifiedDateTime,
    } = audit;

    let loanModels: LoanModel[];

    if (loans?.length > 0) {
      loanModels = loans.map((loan) => this._loanMapper.toPersistence(loan));
    }

    const model: BorrowerModel = {
      id: entity.id,
      name,
      phoneNumber,
      loans: loanModels,
      auditCreatedBy,
      auditCreatedDateTime,
      auditDeletedBy,
      auditDeletedDateTime,
      auditModifiedBy,
      auditModifiedDateTime,
    };
    return model;
  }

  toDomain(model: BorrowerModel): Borrower {
    const { name, id, phoneNumber, loans } = model;

    let loanDetails: Loan[];

    if (loans?.length > 0) {
      loanDetails = loans.map((loan) => this._loanMapper.toDomain(loan));
    }
    return Borrower.create(
      {
        name,
        phoneNumber,
        loans: loanDetails,
        audit: new AuditMapper().toDomain(model),
      },
      id,
    ).getValue();
  }
}
