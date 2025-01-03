import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TYPES } from 'src/applications/constant';
import {
  IAddBorrowerInput,
  IBorrowerService,
} from 'src/applications/interfaces/borrowerService.interface';
import { BorrowerModel } from '../infrastructure/dataAccess/models/borrower.entity';
import { Borrower } from 'src/Modules/borrower/borrower';
import { AddBorrowerInput } from 'src/Modules/borrower/dto/borrowerInput.dto';
import { BorrowerResponseDto } from 'src/Modules/borrower/dto/borrowerOutput.dto';

@Resolver()
export class BorrowerResolver {
  constructor(
    @Inject(TYPES.IBorrowerService)
    private readonly _borrowerService: IBorrowerService,
  ) {}

  @Query(() => [BorrowerResponseDto])
  async getBorrowers(): Promise<Borrower[]> {
    return await this._borrowerService.getBorrowerList();
  }

  @Mutation(() => BorrowerModel, { name: 'addBorrower' })
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
}
