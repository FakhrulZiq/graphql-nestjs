import { Audit } from 'src/domain/audit/audit';

export interface IInstalmentSchedule {
  instalmentNumber: number;
  dueDate: string;
  amountDue: number;
  status: string;
  loanId: string;
  audit: Audit;
}
