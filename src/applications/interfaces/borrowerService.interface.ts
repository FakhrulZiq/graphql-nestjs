import { InstalmentSchedule } from 'src/Modules/InstalmentSchedule/InstalmentSchedule';

export interface IBorrowerService {
  addNewBorrower(input: IAddBorrowerInput): Promise<INewBorrowerResponse>;
  trackUserLoan(phoneNumber: string): Promise<ITrackUserLoan>;
  getBorrwerList(): Promise<IBorrowerList[]>;
  getBorrowerByInstalmentScheduleId(
    instalmentId: string,
  ): Promise<IBorrowerInstalment>;
}

export interface IAddBorrowerInput {
  name: string;
  phoneNumber: string;
  loanAmount: number;
  totalInstalments: number;
  remark: string;
  proofLink?: string;
}

export interface ITrackUserLoan {
  loanAmount: string;
  outstandingAmount: string;
  currentMonthDue: string;
  carryOverAmount: number;
  instalments: IInstalmentSchedule[];
}

export interface ICalculatedLoanDetails {
  loanAmount: string;
  outstandingAmount: string;
  currentMonthDue: string;
  carryOverAmount: number;
  instalments: InstalmentSchedule[];
}

export interface IInstalmentSchedule {
  id: string;
  instalmentNumber: number;
  dueDate: string;
  amountDue: number;
  status: string;
}

export interface INewBorrowerResponse {
  id: string;
  name: string;
  phoneNumber: string;
}

interface ILoanList {
  loanAmount: number;
  loanStartDate: string;
  loanStatus: string;
  totalInstalments: number;
  outStandingAmount: number;
  remark: string;
}

export interface IBorrowerList {
  name: string;
  phoneNumber: string;
  loans: ILoanList[];
}

export interface IBorrowerInstalment {
  instalmentId: string;
  name: string;
  phoneNumber: string;
  description: string;
  amount: number;
}
