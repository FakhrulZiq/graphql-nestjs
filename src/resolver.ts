import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TYPES } from 'src/applications/constant';
import {
  IAddBorrowerInput,
  IBorrowerService,
  ITrackUserLoan,
} from 'src/applications/interfaces/borrowerService.interface';
import {
  ILoanListResponse,
  ILoanService,
} from 'src/applications/interfaces/loanService.interface';
import { AddBorrowerInput } from 'src/Modules/borrower/dto/borrowerInput.dto';
import { LoanResponseDto } from 'src/Modules/loan/dto/loanOutput.dto';
import { BorrowerModel } from './infrastructure/dataAccess/models/borrower.entity';
import { TrackUserLoanResponseDto } from './Modules/borrower/dto/borrowerOutput.dto';

@Resolver()
export class UoMeResolver {
  constructor(
    @Inject(TYPES.IBorrowerService)
    private readonly _borrowerService: IBorrowerService,
    @Inject(TYPES.ILoanService)
    private readonly _loanService: ILoanService,
  ) {}

  @Query(() => [LoanResponseDto])
  async getLoanList(): Promise<ILoanListResponse[]> {
    return await this._loanService.getLoanList();
  }

  @Mutation(() => BorrowerModel)
  async addBorrower(
    @Args('addBorrowerInput') addBorrowerInput: AddBorrowerInput,
  ): Promise<BorrowerModel> {
    const { name, phoneNumber, loanAmount, totalInstalments } =
      addBorrowerInput;
    const input: IAddBorrowerInput = {
      name,
      phoneNumber,
      loanAmount,
      totalInstalments,
    };
    return await this._borrowerService.addNewBorrower(input);
  }

  @Query(() => [TrackUserLoanResponseDto])
  async trackUserLoan(): Promise<ITrackUserLoan[]> {
    const userLoan: ITrackUserLoan[] =
      await this._borrowerService.trackUserLoan('011-87654345');
    return userLoan;
  }
}
