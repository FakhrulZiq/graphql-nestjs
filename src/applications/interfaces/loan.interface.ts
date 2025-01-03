import { Audit } from 'src/domain/audit/audit';
import { Borrower } from 'src/Modules/borrower/borrower';

export interface ILoan {
  loanAmount: number;
  totalInstalments: number;
  outStandingAmount: number;
  loanStartDate: Date;
  loanStatus: string;
  remark?: string;
  proofLink?: string;
  borrowerId: string;
  borrower?: Borrower;
  audit: Audit;
}
