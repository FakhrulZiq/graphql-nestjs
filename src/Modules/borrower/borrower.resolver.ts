import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TYPES } from 'src/applications/constant';
import {
  IBorrowerList,
  IBorrowerService,
  INewBorrowerResponse,
  ITrackUserLoan,
} from 'src/applications/interfaces/borrowerService.interface';
import {
  AddBorrowerInput,
  TrackUserLoanInput,
} from 'src/Modules/borrower/dto/borrowerInput.dto';
import {
  BorrowerListResponseDto,
  NewBorrowerResponseDto,
  TrackUserLoanResponseDto,
} from './dto/borrowerOutput.dto';

@Resolver()
export class BorrowerResolver {
  constructor(
    @Inject(TYPES.IBorrowerService)
    private readonly _borrowerService: IBorrowerService,
  ) {}

  @Query(() => [BorrowerListResponseDto])
  async getBorrowerList(): Promise<IBorrowerList[]> {
    return await this._borrowerService.getBorrwerList();
  }

  @Mutation(() => NewBorrowerResponseDto)
  async addBorrower(
    @Args('addBorrowerInput') addBorrowerInput: AddBorrowerInput,
  ): Promise<INewBorrowerResponse> {
    const newBorrower: INewBorrowerResponse =
      await this._borrowerService.addNewBorrower(addBorrowerInput);
    return newBorrower;
  }

  @Query(() => TrackUserLoanResponseDto)
  async trackUserLoan(
    @Args('trackUserLoanInput') trackUserLoanInput: TrackUserLoanInput,
  ): Promise<ITrackUserLoan> {
    const userLoan: ITrackUserLoan = await this._borrowerService.trackUserLoan(
      trackUserLoanInput.phoneNumber,
    );
    return userLoan;
  }
}
