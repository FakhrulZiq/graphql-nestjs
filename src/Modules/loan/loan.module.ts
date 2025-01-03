import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TYPES } from 'src/applications/constant';
import { LoanModel } from 'src/infrastructure/dataAccess/models/loan.entity';
import { LoanRepository } from 'src/infrastructure/dataAccess/repositories/loan.repository';
import { LoanMapper } from './Loan.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([LoanModel])],
  providers: [
    {
      provide: TYPES.ILoanRepository,
      useClass: LoanRepository,
    },
    LoanMapper,
  ],
})
export class LoanModule {}
