import { Inject, Injectable } from '@nestjs/common';
import {
  CRUD_ACTION,
  INSTALMENT_STATUS,
  TYPES,
} from 'src/applications/constant';
import { IAudit } from 'src/applications/interfaces/audit.interface';
import { ILoanRepository } from 'src/applications/interfaces/LoanRepository.interface';
import {
  ILoanListResponse,
  ILoanService,
} from 'src/applications/interfaces/loanService.interface';
import { Audit } from 'src/domain/audit/audit';
import { IContextAwareLogger } from 'src/infrastructure/logger';
import { applicationError } from 'src/utilities/exceptionInstance';
import { Loan } from './Loan';
import { LoanParser } from './loan.parser';

@Injectable()
export class LoanService implements ILoanService {
  constructor(
    @Inject(TYPES.IApplicationLogger)
    private readonly _logger: IContextAwareLogger,
    @Inject(TYPES.ILoanRepository)
    private readonly _loanRepository: ILoanRepository,
  ) {}

  async addLoanDetail(
    loanAmount: number,
    totalInstalments: number,
    borrowerId: string,
  ): Promise<string> {
    try {
      const currentDate = new Date();

      const auditProps: IAudit = Audit.createAuditProperties(
        'Fakhrul',
        CRUD_ACTION.create,
      );
      const audit: Audit = Audit.create(auditProps).getValue();

      const saveLoan = Loan.create({
        loanAmount,
        totalInstalments,
        outStandingAmount: loanAmount,
        loanStartDate: currentDate,
        loanStatus: INSTALMENT_STATUS.pending,
        borrowerId,
        audit,
      }).getValue();

      const savedData = await this._loanRepository.save(saveLoan);

      if (!savedData) {
        throw applicationError(`Unable to create loan`);
      }
      return savedData.id;
    } catch (error) {
      this._logger.error(error.message, error);
      throw error;
    }
  }

  async getLoanList(): Promise<ILoanListResponse[]> {
    try {
      const loan: Loan[] = await this._loanRepository.findAll();

      const partsedLoan: ILoanListResponse[] = LoanParser.loanParser(loan);

      return partsedLoan;
    } catch (error) {
      this._logger.error(error.message, error);
      throw error;
    }
  }
}
