import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILoanRepository } from 'src/applications/interfaces/loanRepository.interface';
import { Loan } from 'src/modules/Loan/Loan';
import { LoanMapper } from 'src/modules/Loan/Loan.mapper';
import { Repository } from 'typeorm';
import { LoanModel } from '../models/Loan.entity';
import { GenericSqlRepository } from './generic.repository';

@Injectable()
export class LoanRepository
  extends GenericSqlRepository<Loan, LoanModel>
  implements ILoanRepository
{
  loanMapper: LoanMapper;
  constructor(
    @InjectRepository(LoanModel)
    repository: Repository<LoanModel>,
    mapper: LoanMapper,
  ) {
    super(repository, mapper);
    this.loanMapper = mapper;
  }
}
