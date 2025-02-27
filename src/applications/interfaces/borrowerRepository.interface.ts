import { Borrower } from 'src/Modules/borrower/borrower';
import { IGenericRepository } from './genricRepository.interface';
import { BorrowerModel } from 'src/infrastructure/dataAccess/models/borrower.entity';

export interface IBorrowerRepository
  extends IGenericRepository<Borrower, BorrowerModel> {
  getAllBorrowerList(): Promise<Borrower[]>;
  getBorrowerLoanDetails(phoneNumber: string): Promise<Borrower>;
  getBorrowerById(id: string): Promise<Borrower>;
}
