import {
  ICalculatedLoanDetails,
  ITrackUserLoan,
} from 'src/applications/interfaces/borrowerService.interface';
import { extractDateFromISOString } from 'src/utilities/utils';

export class BorrowerParser {
  static userLoanParser(loans: ICalculatedLoanDetails[]): ITrackUserLoan[] {
    const data = loans.map((loan: ICalculatedLoanDetails) => {
      return {
        loanId: loan?.loanId,
        loanAmount: loan?.loanAmount,
        outstandingAmount: loan?.outstandingAmount,
        currentMonthDue: loan?.currentMonthDue,
        carryOverAmount: loan?.carryOverAmount,
        instalments: loan?.instalments?.map((instalment) => ({
          instalmentNumber: instalment.instalmentNumber,
          dueDate: extractDateFromISOString(instalment.dueDate),
          amountDue: instalment.amountDue,
          status: instalment.status,
          loanId: instalment.loanId,
        })),
      };
    });
    return data;
  }
}
