export interface IPaymentService {
  getPaymentList(): Promise<any[]>;
  handlePaymentCallback(data: any): Promise<boolean>;
}

export interface IPaymentList {
  instalmentId: string;
  date: string;
  amount: number;
  method: string;
  status: string;
  transactionId: string;
}
