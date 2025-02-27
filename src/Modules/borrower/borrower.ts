import { IBorrower } from 'src/applications/interfaces/borrower.interface';
import { Audit } from 'src/domain/audit/audit';
import { Entity } from 'src/domain/entity';
import { Result } from 'src/domain/result';
import { updateEntity } from 'src/utilities/utils';
import { Loan } from '../Loan/Loan';

export class Borrower extends Entity implements IBorrower {
  name: string;
  phoneNumber: string;
  loans?: Loan[];
  audit: Audit;

  constructor(id: string, props: IBorrower) {
    super(id);
    this.name = props.name;
    this.phoneNumber = props.phoneNumber;
    this.loans = props.loans;
    this.audit = props.audit;
  }

  static create(props: IBorrower, id?: string): Result<Borrower> {
    return Result.ok<Borrower>(new Borrower(id, props));
  }

  static update(
    props: Partial<IBorrower>,
    borrower: Borrower,
    audit: Audit,
  ): Borrower {
    return updateEntity(props, borrower, audit);
  }
}
