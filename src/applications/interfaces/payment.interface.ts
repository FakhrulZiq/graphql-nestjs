import { Audit } from 'src/domain/audit/audit';

export interface IPayment {
  loanId: string;
  paymentAmount: number;
  paymentDate: Date;
  paymentMethod: string;
  paymentStatus: string;
  audit: Audit;
}
