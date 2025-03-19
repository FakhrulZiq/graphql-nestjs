import { Audit } from 'src/domain/audit/audit';
import { Borrower } from 'src/modules/borrower/borrower';
import { InstalmentSchedule } from 'src/modules/InstalmentSchedule/InstalmentSchedule';
import { Payment } from 'src/modules/payment/payment';

export interface ILoanService {
  addLoanDetail(
    loanAmount: number,
    totalInstalments: number,
    borrowerId: string,
    remark: string,
    proofLink: string,
  ): Promise<string>;
  getLoanList(): Promise<ILoanListResponse[]>;
}

export interface ILoanListResponse {
  name: string;
  phoneNumber: string;
  loanAmount: number;
  totalInstalments: number;
  outStandingAmount: number;
  loanStartDate: string;
  loanStatus: string;
}

export interface ILoanWithBorrower {
  borrower: Borrower;
  loanAmount: number;
  totalInstalments: number;
  outStandingAmount: number;
  loanStartDate: string;
  loanStatus: string;
  remark?: string;
  proofLink?: string;
  borrowerId: string;
  payments?: Payment[];
  instalmentSchedules?: InstalmentSchedule[];
  audit: Audit;
}
