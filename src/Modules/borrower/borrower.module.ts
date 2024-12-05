import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowerService } from './borrower.service';
import { BorrowerModel } from 'src/infrastructure/dataAccess/models/borrower.entity';
import { LoanModel } from 'src/infrastructure/dataAccess/models/loan.entity';
import { BorrowerRepository } from 'src/infrastructure/dataAccess/repositories/borrower.repository';
import { LoanRepository } from 'src/infrastructure/dataAccess/repositories/loan.repository';
import { BorrowerResolver } from 'src/resolvers/borrower.resolver';
import { TYPES } from 'src/applications/constant';
import { ApplicationLogger } from 'src/infrastructure/logger';
import { BorrowerMapper } from './borrower.mapper';
@Module({
  imports: [TypeOrmModule.forFeature([BorrowerModel, LoanModel])],
  providers: [
    {
      provide: TYPES.IBorrowerService,
      useClass: BorrowerService,
    },
    {
      provide: TYPES.IBorrowerRepository,
      useClass: BorrowerRepository,
    },
    { provide: TYPES.IApplicationLogger, useClass: ApplicationLogger },
    BorrowerMapper,
    BorrowerResolver,
    BorrowerRepository,
    LoanRepository,
  ],
})
export class BorrowerModule {}
