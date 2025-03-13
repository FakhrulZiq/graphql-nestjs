export interface IBillplzService {
  createBill(
    instalmentId: string,
    callbackUrl: string,
    redirectUrl: string,
  ): Promise<any>;
  getBillStatus(billId: string): Promise<any>;
}

export interface ICreatedBill {
  billCode: string;
  billpaymentLink: string;
}
