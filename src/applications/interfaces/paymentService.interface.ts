export interface IPaymentService {
  getPaymentList(): Promise<IPaymentList[]>;
  handlePaymentCallback(data: IBillplzBillCallback): Promise<boolean>;
}

export interface IPaymentList {
  instalmentId: string;
  date: string;
  amount: number;
  method: string;
  status: string;
  transactionId: string;
}

export interface IBillplzBillCallback {
  id: string;
  collection_id: string;
  paid: string;
  state: string;
  amount: string;
  paid_amount: string;
  due_at: string;
  name: string;
  email: string;
  mobile: string;
  url: string;
  paid_at: string;
  x_signature: string;
  reference_1_label?: string;
  reference_1?: string;
  reference_2_label?: string;
  reference_2?: string | null;
  redirect_url?: string;
  callback_url?: string;
  description?: string;
}
