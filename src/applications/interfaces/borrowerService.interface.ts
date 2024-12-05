import { BorrowerModel } from 'src/infrastructure/dataAccess/models/borrower.entity';
import { Borrower } from 'src/Modules/borrower/borrower';

export interface IBorrowerService {
  addNewBorrower(input: IAddBorrowerInput): Promise<BorrowerModel>;
  getBorrowerList(): Promise<Borrower[]>;
}

export interface IAddBorrowerInput {
  name: string;
  phoneNumber: string;
  loanAmount: number;
  totalInstallments: number;
}
