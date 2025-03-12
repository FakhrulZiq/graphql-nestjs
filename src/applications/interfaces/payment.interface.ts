import { Audit } from 'src/domain/audit/audit';

export interface IPayment {
  instalmentId: string;
  paymentAmount: number;
  paymentDate: string;
  paymentMethod: string;
  paymentStatus: string;
  transactionId: string;
  audit: Audit;
}
