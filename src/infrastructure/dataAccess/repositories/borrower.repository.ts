import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BorrowerModel } from '../models/borrower.entity';
import { GenericSqlRepository } from './generic.repository';
import { Borrower } from 'src/Modules/borrower/borrower';
import { BorrowerMapper } from 'src/Modules/borrower/borrower.mapper';
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
      const borrowers: BorrowerModel[] = await this.repository.find();
      const response = borrowers.map((borrower: BorrowerModel) =>
        this.borrowerMapper.toDomain(borrower),
      );
      return response;
    } catch (error) {
      this._logger.error(error.message, error);
      throw error;
    }
  }
}
