import { LoanModel } from 'src/infrastructure/dataAccess/models/Loan.entity';
import { Loan } from 'src/Modules/Loan/Loan';
import { IGenericRepository } from './genricRepository.interface';

export interface ILoanRepository extends IGenericRepository<Loan, LoanModel> {}
