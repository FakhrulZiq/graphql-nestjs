import { Audit } from 'src/domain/audit/audit';
import { Loan } from 'src/Modules/Loan/Loan';

export interface IInstalmentSchedule {
  instalmentNumber: number;
  dueDate: Date;
  amountDue: number;
  status: string;
  loanId: string;
  loan?: Loan;
  audit: Audit;
}
