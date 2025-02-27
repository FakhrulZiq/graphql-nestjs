import { BorrowerModel } from 'src/infrastructure/dataAccess/models/borrower.entity';
import { InstalmentSchedule } from 'src/Modules/InstalmentSchedule/InstalmentSchedule';

export interface IBorrowerService {
  addNewBorrower(input: IAddBorrowerInput): Promise<BorrowerModel>;
  trackUserLoan(phoneNumber: string): Promise<ITrackUserLoan[]>;
}

export interface IAddBorrowerInput {
  name: string;
  phoneNumber: string;
  loanAmount: number;
  totalInstalments: number;
}

export interface ITrackUserLoan {
  loanId: string;
  loanAmount: number;
  outstandingAmount: number;
  currentMonthDue: number;
  carryOverAmount: number;
  instalments: IInstalmentSchedule[];
}

export interface ICalculatedLoanDetails {
  loanId: string;
  loanAmount: number;
  outstandingAmount: number;
  currentMonthDue: number;
  carryOverAmount: number;
  instalments: InstalmentSchedule[];
}

export interface IInstalmentSchedule {
  instalmentNumber: number;
  dueDate: string;
  amountDue: number;
  status: string;
  loanId: string;
}
