import { Inject, Injectable } from '@nestjs/common';
import { CRUD_ACTION, TYPES } from 'src/applications/constant';
import { IAudit } from 'src/applications/interfaces/audit.interface';
import { IBorrowerRepository } from 'src/applications/interfaces/borrowerRepository.interface';
import {
  IAddBorrowerInput,
  IBorrowerService,
  ICalculatedLoanDetails,
  ITrackUserLoan,
} from 'src/applications/interfaces/borrowerService.interface';
import { IInstalmentScheduleService } from 'src/applications/interfaces/instalmentScheduleService.interface';
import { ILoanService } from 'src/applications/interfaces/loanService.interface';
import { Audit } from 'src/domain/audit/audit';
import { BorrowerModel } from 'src/infrastructure/dataAccess/models/borrower.entity';
import { IContextAwareLogger } from 'src/infrastructure/logger';
import { applicationError } from 'src/utilities/exceptionInstance';
import { InstalmentSchedule } from '../InstalmentSchedule/InstalmentSchedule';
import { Loan } from '../Loan/Loan';
import { Payment } from '../payment/payment';
import { Borrower } from './borrower';
import { BorrowerParser } from './borrower.parser';

@Injectable()
export class BorrowerService implements IBorrowerService {
  constructor(
    @Inject(TYPES.IBorrowerRepository)
    private readonly _borrowerRepository: IBorrowerRepository,
    @Inject(TYPES.IInstalmentScheduleService)
    private readonly _instalmentScheduleService: IInstalmentScheduleService,
    @Inject(TYPES.ILoanService)
    private readonly _loanService: ILoanService,
    @Inject(TYPES.IApplicationLogger)
    private readonly _logger: IContextAwareLogger,
  ) {}

  async addNewBorrower(input: IAddBorrowerInput): Promise<BorrowerModel> {
    try {
      const { name, phoneNumber, loanAmount, totalInstalments } = input;

      const auditProps: IAudit = Audit.createAuditProperties(
        input.name,
        CRUD_ACTION.create,
      );
      const audit: Audit = Audit.create(auditProps).getValue();

      const savedBorrower = Borrower.create({
        name,
        phoneNumber,
        audit,
      }).getValue();

      const savedData = await this._borrowerRepository.save(savedBorrower);

      if (!savedData) {
        throw applicationError(
          `Unable to create user profile with properties ${JSON.stringify(
            input,
          )}`,
        );
      }

      const loanId = await this._loanService.addLoanDetail(
        loanAmount,
        totalInstalments,
        savedData.id,
      );

      await this._instalmentScheduleService.addInstalmentSchedule(
        loanAmount,
        totalInstalments,
        loanId,
      );

      return savedData;
    } catch (error) {
      this._logger.error(error.message, error);
      throw error;
    }
  }

  async trackUserLoan(phoneNumber: string): Promise<ITrackUserLoan[]> {
    try {
      const borrower =
        await this._borrowerRepository.getBorrowerLoanDetails(phoneNumber);

      if (!borrower) {
        throw applicationError('Borrower not found');
      }

      const loans: ICalculatedLoanDetails[] = borrower.loans.map((loan: Loan) =>
        this._calculateLoanDetails(loan),
      );

      const userLoan: ITrackUserLoan[] = BorrowerParser.userLoanParser(loans);

      return userLoan;
    } catch (error) {
      this._logger.error(error.message, error);
      throw error;
    }
  }

  /**
   * Helper method to calculate loan details.
   */
  private _calculateLoanDetails(loan: Loan): ICalculatedLoanDetails {
    const currentDate = new Date();

    const totalPaymentsMade: number = this._calculateTotalPayments(
      loan.payments,
    );
    const pastInstalments: InstalmentSchedule[] = this._filterPastInstalments(
      loan.instalmentSchedules,
      currentDate,
    );
    const currentMonthInstalments: InstalmentSchedule[] =
      this._filterCurrentMonthInstalments(
        loan.instalmentSchedules,
        currentDate,
      );

    const totalAmountDue: number =
      this._calculateTotalAmountDue(pastInstalments);
    const carryOverAmount: number = totalPaymentsMade - totalAmountDue;
    const currentMonthDue: number = this._calculateCurrentMonthDue(
      currentMonthInstalments,
      carryOverAmount,
    );

    return {
      loanId: loan.id,
      loanAmount: loan.loanAmount,
      outstandingAmount: loan.outStandingAmount,
      currentMonthDue: Math.max(currentMonthDue, 0),
      carryOverAmount,
      instalments: loan.instalmentSchedules,
    };
  }

  /**
   * Helper method to calculate total payments made.
   */
  private _calculateTotalPayments(payments: Payment[]) {
    return (
      payments?.reduce(
        (sum: number, payment: Payment) => sum + payment.paymentAmount,
        0,
      ) || 0
    );
  }

  /**
   * Helper method to filter past instalments.
   */
  private _filterPastInstalments(
    instalments: InstalmentSchedule[],
    currentDate: Date,
  ) {
    return instalments.filter(
      (schedule: InstalmentSchedule) => schedule.dueDate < currentDate,
    );
  }

  /**
   * Helper method to filter current month instalments.
   */
  private _filterCurrentMonthInstalments(
    instalments: InstalmentSchedule[],
    currentDate: Date,
  ) {
    return instalments.filter(
      (schedule: InstalmentSchedule) =>
        new Date(schedule.dueDate).getMonth() === currentDate.getMonth() &&
        new Date(schedule.dueDate).getFullYear() === currentDate.getFullYear(),
    );
  }

  /**
   * Helper method to calculate the total amount due from past instalments.
   */
  private _calculateTotalAmountDue(instalments: InstalmentSchedule[]) {
    return instalments.reduce(
      (sum: number, schedule: InstalmentSchedule) => sum + schedule.amountDue,
      0,
    );
  }

  /**
   * Helper method to calculate the current month's due amount.
   */
  private _calculateCurrentMonthDue(
    currentMonthInstalments: InstalmentSchedule[],
    carryOverAmount: number,
  ) {
    return (
      currentMonthInstalments.reduce(
        (sum: number, schedule: InstalmentSchedule) => sum + schedule.amountDue,
        0,
      ) - carryOverAmount
    );
  }
}
