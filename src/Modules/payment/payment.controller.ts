import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { TYPES } from 'src/applications/constant';
import {
  IBillplzBillCallback,
  IPaymentService,
} from 'src/applications/interfaces/paymentService.interface';

@Controller('payment')
export class PaymentController {
  constructor(
    @Inject(TYPES.IPaymentService)
    private readonly _paymentService: IPaymentService,
  ) {}

  @Post('callback')
  async handleCallback(
    @Body() body: IBillplzBillCallback,
    @Res() res: Response,
  ) {
    console.log('Billplz Callback Received:', body);
    await this._paymentService.handlePaymentCallback(body);
    res.status(200).send('Callback received');
  }

  //this will be frontend redirect url
  @Post('redirect')
  async handleRedicrect(@Body() body: any, @Res() res: Response) {
    console.log('Billplz redirect Received:', body);

    res.status(200).send('Redirect received');
  }
}
