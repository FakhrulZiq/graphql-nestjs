import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoanModel } from '../models/loan.entity';
import { BorrowerModel } from '../models/borrower.entity';

@Injectable()
export class LoanRepository {
  constructor(
    @InjectRepository(LoanModel)
    private readonly loanRepository: Repository<LoanModel>,
  ) {}

  async createAndSaveLoan(
    borrower: BorrowerModel,
    loanAmount: number,
    totalInstallments: number,
    loanStartDate: string,
    loanStatus: string,
  ): Promise<LoanModel> {
    const newLoan = this.loanRepository.create({
      borrower,
      loanAmount,
      totalInstallments,
      outStandingAmount: loanAmount,
      loanStartDate,
      loanStatus,
    });
    return await this.loanRepository.save(newLoan);
  }
}
