import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { TYPES } from 'src/applications/constant';
import {
  IBorrowerInstalment,
  IBorrowerService,
} from 'src/applications/interfaces/borrowerService.interface';
import { IContextAwareLogger } from '../logger';
import { IBillplzService } from './interface/billplzService.interface';

@Injectable()
export class BillplzService implements IBillplzService {
  private readonly _billplzApiKey: string;
  private readonly _billplzCollectionId: string;
  private readonly _billplzUrl: string;

  constructor(
    @Inject(TYPES.IApplicationLogger)
    private readonly _logger: IContextAwareLogger,
    @Inject(TYPES.IBorrowerService)
    private readonly _borrowerService: IBorrowerService,
    private readonly _configService: ConfigService,
  ) {
    this._billplzApiKey = this._configService.get('BILLPLZ_API_KEY');
    this._billplzCollectionId = this._configService.get(
      'BILLPLZ_COLLECTION_ID',
    );
    this._billplzUrl = this._configService.get('BILLPLZ_URL');
  }

  async createBill(
    instalmentId: string,
    callbackUrl: string,
    redirectUrl: string,
  ): Promise<any> {
    const borrowerInstalment: IBorrowerInstalment =
      await this._borrowerService.getBorrowerByInstalmentScheduleId(
        instalmentId,
      );

    const url = `${this._billplzUrl}/bills`;

    const auth = Buffer.from(`${this._billplzApiKey}:`).toString('base64');

    const headers = {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const data = new URLSearchParams();
    data.append('collection_id', this._billplzCollectionId);
    data.append('description', borrowerInstalment.description);
    data.append('email', 'fakhrul@gmail.com');
    data.append('name', borrowerInstalment.name);
    data.append('amount', String(borrowerInstalment.amount * 100));
    data.append('callback_url', callbackUrl);
    data.append('redirect_url', redirectUrl);
    data.append('reference_1_label', 'Payment ID');
    data.append('reference_1', borrowerInstalment.instalmentId);

    try {
      const response = await axios.post(url, data.toString(), { headers });
      return response.data;
    } catch (error) {
      this._logger.error(error.response?.data || error.message, error);
      throw error;
    }
  }

  async getBillStatus(billId: string): Promise<any> {
    const url = `${this._billplzUrl}/bills/${billId}`;
    const headers = {
      Authorization: `Basic ${Buffer.from(this._billplzApiKey + ':').toString('base64')}`,
    };

    try {
      const response = await axios.get(url, { headers });
      return response.data;
    } catch (error) {
      console.error(
        'Error retrieving Billplz bill status:',
        error.response?.data || error.message,
      );
      throw new Error('Failed to retrieve bill status.');
    }
  }
}
