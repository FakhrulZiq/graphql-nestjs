import { Audit } from 'src/domain/audit/audit';

export interface IPayment {
  loanId: string;
  paymentAmount: number;
  paymentDate: string;
  paymentMethod: string;
  paymentStatus: string;
  audit: Audit;
}
