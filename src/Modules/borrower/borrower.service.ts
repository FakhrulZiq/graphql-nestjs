import { Inject, Injectable } from '@nestjs/common';
import { CRUD_ACTION, TYPES } from 'src/applications/constant';
import { IAudit } from 'src/applications/interfaces/audit.interface';
import { IBorrowerRepository } from 'src/applications/interfaces/borrowerRepository.interface';
import {
  IAddBorrowerInput,
  IBorrowerService,
} from 'src/applications/interfaces/borrowerService.interface';
import { BorrowerModel } from 'src/infrastructure/dataAccess/models/borrower.entity';
import { Audit } from 'src/domain/audit/audit';
import { applicationError } from 'src/utilities/exceptionInstance';
import { Borrower } from './borrower';
import { IContextAwareLogger } from 'src/infrastructure/logger';
import { IInstalmentScheduleService } from 'src/applications/interfaces/instalmentScheduleService.interface';
import { ILoanService } from 'src/applications/interfaces/loanService';

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

  async getBorrowerList(): Promise<Borrower[]> {
    try {
      const borrower = await this._borrowerRepository.getAllBorrowerList();
      return borrower;
    } catch (error) {
      this._logger.error(error.message, error);
      throw error;
    }
  }
}
