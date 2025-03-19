import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoanModel } from 'src/infrastructure/dataAccess/models/loan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LoanModel])],
  providers: [],
})
export class LoanModule {}
