export interface ILoanService {
  addLoanDetail(
    loanAmount: number,
    totalInstalments: number,
    borrowerId: string,
  ): Promise<string>;
  getLoanList(): Promise<ILoanListResponse[]>;
}

export interface ILoanListResponse {
  id: string;
  name: string;
  phoneNumber: string;
  loanAmount: number;
  totalInstalments: number;
  outStandingAmount: number;
  loanStartDate: string;
  loanStatus: string;
}
