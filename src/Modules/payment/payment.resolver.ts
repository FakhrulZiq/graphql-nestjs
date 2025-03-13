import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TYPES } from 'src/applications/constant';
import {
  IPaymentList,
  IPaymentService,
} from '../../applications/interfaces/paymentService.interface';
import { BillStatusInput, CreateBillInput } from './dto/paymentInput.dto';
import { Bill, PaymentListResponse } from './dto/paymentOuput.dto';
import { IBillplzService } from 'src/infrastructure/billplz/interface/billplzService.interface';

@Resolver()
export class PaymentResolver {
  constructor(
    @Inject(TYPES.IPaymentService)
    private readonly _paymentService: IPaymentService,
    @Inject(TYPES.IBillplzService)
    private readonly _billplzService: IBillplzService,
  ) {}

  @Query(() => [PaymentListResponse])
  async getPaymentList(): Promise<IPaymentList[]> {
    return await this._paymentService.getPaymentList();
  }

  @Mutation(() => Bill)
  async createBill(@Args('createBillInput') input: CreateBillInput) {
    const { instalmentId, callbackUrl, redirectUrl } = input;
    const bill = await this._billplzService.createBill(
      instalmentId,
      callbackUrl,
      redirectUrl,
    );

    return {
      id: bill.id,
      url: bill.url,
      status: bill.state,
    };
  }

  @Query(() => Bill)
  async getBillStatus(@Args('input') input: BillStatusInput) {
    const bill = await this._billplzService.getBillStatus(input.billId);
    return {
      id: bill.id,
      url: bill.url,
      status: bill.state,
    };
  }
}
