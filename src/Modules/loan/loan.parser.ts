import { ILoanListResponse } from 'src/applications/interfaces/loanService.interface';
import { Loan } from './Loan';
import { extractDateFromISOString } from 'src/utilities/utils';

export class LoanParser {
  static loanParser(loans: Loan[]): ILoanListResponse[] {
    const data = loans.map((loan: Loan) => {
      return {
        id: loan.id,
        name: loan?.borrower?.name,
        phoneNumber: loan?.borrower?.phoneNumber,
        loanAmount: loan?.loanAmount,
        totalInstalments: loan?.totalInstalments,
        outStandingAmount: loan?.outStandingAmount,
        loanStartDate: extractDateFromISOString(loan?.loanStartDate),
        loanStatus: loan?.loanStatus,
      };
    });
    return data;
  }
}
