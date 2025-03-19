import { Inject, Injectable } from '@nestjs/common';
import {
  AUDIT_BY_SYSTEM,
  CRUD_ACTION,
  INSTALMENT_STATUS,
  TYPES,
} from 'src/applications/constant';
import { IAudit } from 'src/applications/interfaces/audit.interface';
import { IBorrowerRepository } from 'src/applications/interfaces/borrowerRepository.interface';
import { ILoanRepository } from 'src/applications/interfaces/LoanRepository.interface';
import { ILoanService } from 'src/applications/interfaces/loanService.interface';
import { Audit } from 'src/domain/audit/audit';
import { IContextAwareLogger } from 'src/infrastructure/logger';
import { applicationError } from 'src/utilities/exceptionInstance';
import { Loan } from './Loan';

@Injectable()
export class LoanService implements ILoanService {
  constructor(
    @Inject(TYPES.IApplicationLogger)
    private readonly _logger: IContextAwareLogger,
    @Inject(TYPES.ILoanRepository)
    private readonly _loanRepository: ILoanRepository,
    @Inject(TYPES.IBorrowerRepository)
    private readonly _borrowerRepository: IBorrowerRepository,
  ) {}

  async addLoanDetail(
    loanAmount: number,
    totalInstalments: number,
    borrowerId: string,
    remark: string,
    proofLink: string,
  ): Promise<string> {
    try {
      const currentDate = new Date().toISOString();

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
        loanStatus: INSTALMENT_STATUS.pendingPayment,
        remark,
        proofLink,
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

  async updateLoanAfterPayment(
    id: string,
    status: string,
    paidAmount: string,
  ): Promise<void> {
    try {
      const { paid, partiallyPaid, pendingPayment, fullyPaid } =
        INSTALMENT_STATUS;

      const loan: Loan = await this._loanRepository.findOne({ where: { id } });

      if (!loan) {
        throw applicationError(`There no instalment id =${id}`);
      }

      const outStandingAmount =
        loan.outStandingAmount - Number(paidAmount) / 100;

      let loanStatus = status === paid ? partiallyPaid : pendingPayment;

      if (outStandingAmount <= 0) {
        loanStatus = fullyPaid;
      }

      const auditProps: IAudit = Audit.createAuditProperties(
        AUDIT_BY_SYSTEM,
        CRUD_ACTION.update,
      );
      const audit: Audit = Audit.create(auditProps).getValue();

      const loanUpdate = Loan.update(
        { loanStatus, outStandingAmount },
        loan,
        audit,
      );

      await this._loanRepository.save(loanUpdate);
    } catch (error) {
      this._logger.error(error.errorMessage || error.message, error);
      throw error;
    }
  }
}
