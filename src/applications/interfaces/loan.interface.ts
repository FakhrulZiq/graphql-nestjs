import { Audit } from 'src/domain/audit/audit';
import { InstalmentSchedule } from 'src/Modules/InstalmentSchedule/InstalmentSchedule';
import { Payment } from 'src/Modules/payment/payment';

export interface ILoan {
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
}
