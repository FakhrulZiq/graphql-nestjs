import { Audit } from 'src/domain/audit/audit';
import { Loan } from 'src/Modules/Loan/Loan';

export interface IBorrower {
  name: string;
  phoneNumber: string;
  loans?: Loan[];
  audit: Audit;
}
