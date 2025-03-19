import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BorrowerModel } from '../models/borrower.entity';
import { GenericSqlRepository } from './generic.repository';
import { Borrower } from 'src/modules/borrower/borrower';
import { BorrowerMapper } from 'src/modules/borrower/borrower.mapper';
import { TYPES } from 'src/applications/constant';
import { IContextAwareLogger } from 'src/infrastructure/logger';
import { IBorrowerRepository } from 'src/applications/interfaces/borrowerRepository.interface';

@Injectable()
export class BorrowerRepository
  extends GenericSqlRepository<Borrower, BorrowerModel>
  implements IBorrowerRepository
{
  borrowerMapper: BorrowerMapper;
  constructor(
    @InjectRepository(BorrowerModel)
    repository: Repository<BorrowerModel>,
    borrowerMapper: BorrowerMapper,
    @Inject(TYPES.IApplicationLogger)
    private readonly _logger: IContextAwareLogger,
  ) {
    super(repository, borrowerMapper);
    this.borrowerMapper = borrowerMapper;
  }

  async getAllBorrowerList(): Promise<Borrower[]> {
    try {
      const borrowers: BorrowerModel[] = await this.repository.find({
        relations: ['loans', 'loans.instalmentSchedules'],
      });

      if (borrowers?.length === 0) {
        return [];
      }

      return borrowers.map((borrower: BorrowerModel) =>
        this.borrowerMapper.toDomain(borrower),
      );
    } catch (error) {
      this._logger.error(error.message, error);
      throw error;
    }
  }

  async getBorrowerLoanDetails(phoneNumber: string): Promise<Borrower> {
    try {
      const borrower: BorrowerModel = await this.repository.findOne({
        where: { phoneNumber },
        relations: ['loans', 'loans.instalmentSchedules'],
      });

      if (!borrower) {
        return null;
      }

      return this.borrowerMapper.toDomain(borrower);
    } catch (error) {
      this._logger.error(error.message, error);
      throw error;
    }
  }

  async getBorrowerById(id: string): Promise<Borrower> {
    try {
      const borrower: BorrowerModel = await this.repository.findOne({
        where: { id },
      });

      if (!borrower) {
        return null;
      }

      return this.borrowerMapper.toDomain(borrower);
    } catch (error) {
      this._logger.error(error.message, error);
      throw error;
    }
  }
}
