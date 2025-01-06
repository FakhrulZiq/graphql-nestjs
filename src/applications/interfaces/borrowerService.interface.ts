import { BorrowerModel } from 'src/infrastructure/dataAccess/models/borrower.entity';

export interface IBorrowerService {
  addNewBorrower(input: IAddBorrowerInput): Promise<BorrowerModel>;
}

export interface IAddBorrowerInput {
  name: string;
  phoneNumber: string;
  loanAmount: number;
  totalInstalments: number;
}
