import { Inject, Injectable } from '@nestjs/common';
import {
  AUDIT_BY_SYSTEM,
  CRUD_ACTION,
  INSTALMENT_STATUS,
  TYPES,
} from 'src/applications/constant';
import { IAudit } from 'src/applications/interfaces/audit.interface';
import { IInstalmentSchedule } from 'src/applications/interfaces/InstalmentSchedule.interface';
import { IInstalmentScheduleRepository } from 'src/applications/interfaces/instalmentScheduleRepository.interface';
import {
  IInstalmentScheduleService,
  ITotalPayPerMonth,
} from 'src/applications/interfaces/instalmentScheduleService.interface';
import { ILoanService } from 'src/applications/interfaces/loanService.interface';
import { Audit } from 'src/domain/audit/audit';
import { IContextAwareLogger } from 'src/infrastructure/logger';
import { applicationError } from 'src/utilities/exceptionInstance';
import { InstalmentSchedule } from './instalmentSchedule';

@Injectable()
export class InstalmentScheduleService implements IInstalmentScheduleService {
  constructor(
    @Inject(TYPES.IApplicationLogger)
    private readonly _logger: IContextAwareLogger,
    @Inject(TYPES.IInstalmentScheduleRepository)
    private readonly _instalmentScheduleRepository: IInstalmentScheduleRepository,
    @Inject(TYPES.ILoanService)
    private readonly _loanService: ILoanService,
  ) {}

  private async _calculateInstallmentPerMonth(
    loanAmount: number,
    totalInstalments: number,
  ): Promise<ITotalPayPerMonth[]> {
    try {
      const instalmentAmount =
        Math.floor((loanAmount / totalInstalments) * 100) / 100;
      const totalBaseAmount = instalmentAmount * totalInstalments;
      const lastInstalmentAmount =
        loanAmount - totalBaseAmount + instalmentAmount;

      const dueDates = await this._calculateDueDates(totalInstalments);

      const schedule = [];
      for (let i = 1; i <= totalInstalments; i++) {
        schedule.push({
          instalmentNumber: i,
          amountDue:
            i === totalInstalments ? lastInstalmentAmount : instalmentAmount,
          dueDate: dueDates[i - 1],
        });
      }
      return schedule;
    } catch (error) {
      this._logger.error(error.message, error);
      throw error;
    }
  }

  private async _calculateDueDates(
    totalInstallments: number,
  ): Promise<string[]> {
    try {
      const dueDates: string[] = [];
      const currentDate = new Date();
      const currentDay = currentDate.getDate();

      let monthOffset = currentDay > 10 ? 1 : 0;
      for (let i = 0; i < totalInstallments; i++) {
        const dueDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + monthOffset,
          10,
          12,
        );
        dueDates.push(dueDate.toISOString());
        monthOffset++;
      }

      return dueDates;
    } catch (error) {
      this._logger.error(error.message, error);
      throw error;
    }
  }

  async addInstalmentSchedule(
    loanAmount: number,
    totalInstallments: number,
    loanId: string,
    name: string,
  ): Promise<void> {
    try {
      const installments = await this._calculateInstallmentPerMonth(
        loanAmount,
        totalInstallments,
      );

      for (const installment of installments) {
        await this._saveSingleInstallment(installment, loanId, name);
      }
    } catch (error) {
      this._logger.error(error.message, error);
      throw error;
    }
  }

  private async _saveSingleInstallment(
    instalment: ITotalPayPerMonth,
    loanId: string,
    name: string,
  ): Promise<void> {
    try {
      const { instalmentNumber, dueDate, amountDue } = instalment;

      const auditProps: IAudit = Audit.createAuditProperties(
        name,
        CRUD_ACTION.create,
      );
      const audit: Audit = Audit.create(auditProps).getValue();

      const installmentProps: IInstalmentSchedule = {
        instalmentNumber,
        dueDate,
        amountDue,
        status: INSTALMENT_STATUS.upcoming,
        loanId,
        audit,
      };

      const installmentEntity =
        InstalmentSchedule.create(installmentProps).getValue();

      const saveInstalmentScehdule =
        await this._instalmentScheduleRepository.save(installmentEntity);

      if (!saveInstalmentScehdule) {
        throw applicationError(
          `Unable to create instalment schedule with ${JSON.stringify(
            instalment,
          )}`,
        );
      }
    } catch (error) {
      this._logger.error(error.message, error);
      throw error;
    }
  }

  async updateInstalmentAfterPayment(
    id: string,
    status: string,
    paidAmount: string,
  ): Promise<void> {
    try {
      const instalment: InstalmentSchedule =
        await this._instalmentScheduleRepository.findOne({
          where: { id },
        });

      if (!instalment) {
        throw applicationError(`There no instalment id =${id}`);
      }

      await this._loanService.updateLoanAfterPayment(
        instalment.loanId,
        status,
        paidAmount,
      );

      const auditProps: IAudit = Audit.createAuditProperties(
        AUDIT_BY_SYSTEM,
        CRUD_ACTION.update,
      );
      const audit: Audit = Audit.create(auditProps).getValue();

      const instalmentUpdate = InstalmentSchedule.update(
        { status },
        instalment,
        audit,
      );

      await this._instalmentScheduleRepository.save(instalmentUpdate);
    } catch (error) {
      this._logger.error(error.message, error);
      throw error;
    }
  }
}
