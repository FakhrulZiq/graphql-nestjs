import {
  IBorrowerInstalment,
  IBorrowerList,
  ICalculatedLoanDetails,
  INewBorrowerResponse,
  ITrackUserLoan,
} from 'src/applications/interfaces/borrowerService.interface';
import { extractDateFromISOString } from 'src/utilities/utils';
import { Borrower } from './borrower';
import { Loan } from '../Loan/Loan';
import { InstalmentSchedule } from '../InstalmentSchedule/InstalmentSchedule';

export class BorrowerParser {
  static userLoanParser(loan: ICalculatedLoanDetails): ITrackUserLoan {
    return {
      loanAmount: loan?.loanAmount,
      outstandingAmount: loan?.outstandingAmount,
      currentMonthDue: loan?.currentMonthDue,
      carryOverAmount: loan?.carryOverAmount,
      instalments: loan?.instalments
        ?.map((instalment) => ({
          id: instalment.id,
          instalmentNumber: instalment.instalmentNumber,
          dueDate: extractDateFromISOString(instalment.dueDate),
          amountDue: instalment.amountDue,
          status: instalment.status,
        }))
        .sort(
          (a, b) =>
            new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
        ),
    };
  }

  static newBorrower(borrower: Borrower): INewBorrowerResponse {
    return {
      id: borrower.id,
      name: borrower.name,
      phoneNumber: borrower.phoneNumber,
    };
  }

  static borrowerInstalment(
    instalment: InstalmentSchedule,
    loan: Loan,
    borrower: Borrower,
  ): IBorrowerInstalment {
    return {
      instalmentId: instalment.id,
      name: borrower.name,
      phoneNumber: borrower.phoneNumber,
      description: loan.remark,
      amount: instalment.amountDue,
    };
  }

  static borrowerList(borrowers: Borrower[]): IBorrowerList[] {
    const data = borrowers.map((borrower: Borrower) => {
      return {
        name: borrower.name,
        phoneNumber: borrower.phoneNumber,
        loans: borrower.loans?.map((loan: Loan) => ({
          loanAmount: loan?.loanAmount,
          loanStartDate: extractDateFromISOString(loan?.loanStartDate),
          loanStatus: loan?.loanStatus,
          totalInstalments: loan?.totalInstalments,
          outStandingAmount: loan?.outStandingAmount,
          remark: loan?.remark,
        })),
      };
    });

    return data;
  }
}
