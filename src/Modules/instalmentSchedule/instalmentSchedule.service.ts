import { Inject, Injectable } from '@nestjs/common';
import {
  CRUD_ACTION,
  INSTALMENT_STATUS,
  TYPES,
} from 'src/applications/constant';
import { IAudit } from 'src/applications/interfaces/audit.interface';
import {
  IInstalmentScheduleService,
  ITotalPayPerMonth,
} from 'src/applications/interfaces/instalmentScheduleService.interface';
import { Audit } from 'src/domain/audit/audit';
import { IContextAwareLogger } from 'src/infrastructure/logger';
import { InstalmentSchedule } from './instalmentSchedule';
import { IInstalmentSchedule } from 'src/applications/interfaces/InstalmentSchedule.interface';
import { IInstalmentScheduleRepository } from 'src/applications/interfaces/instalmentScheduleRepository.interface';
import { applicationError } from 'src/utilities/exceptionInstance';

@Injectable()
export class InstalmentScheduleService implements IInstalmentScheduleService {
  constructor(
    @Inject(TYPES.IApplicationLogger)
    private readonly _logger: IContextAwareLogger,
    @Inject(TYPES.IInstalmentScheduleRepository)
    private readonly _instalmentScheduleRepository: IInstalmentScheduleRepository,
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

  private async _calculateDueDates(totalInstallments: number): Promise<Date[]> {
    try {
      const dueDates: Date[] = [];
      const currentDate = new Date();
      const currentDay = currentDate.getDate();

      let monthOffset = currentDay > 10 ? 1 : 0;
      for (let i = 0; i < totalInstallments; i++) {
        const dueDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + monthOffset,
          10,
        );
        dueDates.push(dueDate);
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
  ): Promise<void> {
    try {
      const installments = await this._calculateInstallmentPerMonth(
        loanAmount,
        totalInstallments,
      );

      for (const installment of installments) {
        await this._saveSingleInstallment(installment, loanId);
      }
    } catch (error) {
      this._logger.error(error.message, error);
      throw error;
    }
  }

  private async _saveSingleInstallment(
    instalment: ITotalPayPerMonth,
    loanId: string,
  ): Promise<void> {
    try {
      const { instalmentNumber, dueDate, amountDue } = instalment;

      const auditProps: IAudit = Audit.createAuditProperties(
        'Fakrhul',
        CRUD_ACTION.create,
      );
      const audit: Audit = Audit.create(auditProps).getValue();

      const installmentProps: IInstalmentSchedule = {
        instalmentNumber,
        dueDate,
        amountDue,
        status: INSTALMENT_STATUS.pending,
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
}
