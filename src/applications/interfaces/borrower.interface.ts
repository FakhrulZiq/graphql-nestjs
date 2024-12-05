import { Audit } from 'src/domain/audit/audit';

export interface IBorrower {
  name: string;
  phoneNumber: string;
  loanAmount: number;
  totalInstallments: number;
  audit: Audit;
}
