import { ILoan } from 'src/applications/interfaces/loan.interface';
import { Audit } from 'src/domain/audit/audit';
import { Entity } from 'src/domain/entity';
import { Result } from 'src/domain/result';
import { updateEntity } from 'src/utilities/utils';
import { Payment } from '../payment/payment';
import { InstalmentSchedule } from '../InstalmentSchedule/InstalmentSchedule';

export class Loan extends Entity implements ILoan {
  loanAmount: number;
  totalInstalments: number;
  outStandingAmount: number;
  loanStartDate: string;
  loanStatus: string;
  remark?: string;
  proofLink?: string;
  borrowerId: string;
  instalmentSchedules?: InstalmentSchedule[];
  audit: Audit;

  constructor(id: string, props: ILoan) {
    super(id);
    this.loanAmount = props.loanAmount;
    this.totalInstalments = props.totalInstalments;
    this.outStandingAmount = props.outStandingAmount;
    this.loanStartDate = props.loanStartDate;
    this.loanStatus = props.loanStatus;
    this.remark = props.remark;
    this.proofLink = props.proofLink;
    this.borrowerId = props.borrowerId;
    this.instalmentSchedules = props.instalmentSchedules;
    this.audit = props.audit;
  }

  static create(props: ILoan, id?: string): Result<Loan> {
    return Result.ok<Loan>(new Loan(id, props));
  }

  static update(props: Partial<ILoan>, loan: Loan, audit: Audit): Loan {
    return updateEntity(props, loan, audit);
  }
}
