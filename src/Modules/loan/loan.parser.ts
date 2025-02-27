import {
  ILoanListResponse,
  ILoanWithBorrower,
} from 'src/applications/interfaces/loanService.interface';
import { extractDateFromISOString } from 'src/utilities/utils';

export class LoanParser {
  static loanParser(loans: ILoanWithBorrower[]): ILoanListResponse[] {
    const data = loans.map((loan: ILoanWithBorrower) => {
      return {
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
