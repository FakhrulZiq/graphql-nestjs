import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TYPES } from 'src/applications/constant';
import {
  IAddBorrowerInput,
  IBorrowerService,
} from 'src/applications/interfaces/borrowerService.interface';
import { BorrowerModel } from '../infrastructure/dataAccess/models/borrower.entity';
import { Borrower } from 'src/Modules/borrower/borrower';

@Resolver(() => BorrowerModel)
export class BorrowerResolver {
  constructor(
    @Inject(TYPES.IBorrowerService)
    private readonly _borrowerService: IBorrowerService,
  ) {}

  @Query(() => Borrower[])
  async getBorrowers(): Promise<Borrower[]> {
    return await this._borrowerService.getBorrowerList();
  }

  @Mutation(() => BorrowerModel)
  async addBorrower(
    @Args('name') name: string,
    @Args('phoneNumber') phoneNumber: string,
    @Args('loanAmount') loanAmount: number,
    @Args('totalInstallments') totalInstallments: number,
  ): Promise<BorrowerModel> {
    const input: IAddBorrowerInput = {
      name,
      phoneNumber,
      loanAmount,
      totalInstallments,
    };
    return await this._borrowerService.addNewBorrower(input);
  }
}
