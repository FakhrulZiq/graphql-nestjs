import { Injectable } from '@nestjs/common';
import { Borrower } from './borrower';
import { BorrowerModel } from 'src/infrastructure/dataAccess/models/borrower.entity';
import { IMapper } from 'src/applications/interfaces/mapper.interface';
import { AuditMapper } from 'src/domain/audit/audit.mapper';

@Injectable()
export class BorrowerMapper implements IMapper<Borrower, BorrowerModel> {
  toPersistence(entity: Borrower): BorrowerModel {
    const { name, phoneNumber, loanAmount, totalInstallments, audit } = entity;

    const {
      auditCreatedBy,
      auditCreatedDateTime,
      auditDeletedBy,
      auditDeletedDateTime,
      auditModifiedBy,
      auditModifiedDateTime,
    } = audit;

    const model: BorrowerModel = {
      id: entity.id,
      name,
      phoneNumber,
      loanAmount,
      totalInstallments,
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
    const { name, id, loanAmount, phoneNumber, totalInstallments } = model;

    return Borrower.create(
      {
        name,
        loanAmount,
        phoneNumber,
        totalInstallments,
        audit: new AuditMapper().toDomain(model),
      },
      id,
    ).getValue();
  }
}
