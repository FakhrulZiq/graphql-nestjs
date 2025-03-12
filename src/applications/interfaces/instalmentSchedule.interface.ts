import { Audit } from 'src/domain/audit/audit';
import { Payment } from 'src/Modules/payment/payment';

export interface IInstalmentSchedule {
  instalmentNumber: number;
  dueDate: string;
  amountDue: number;
  status: string;
  loanId: string;
  payments?: Payment[];
  audit: Audit;
}
