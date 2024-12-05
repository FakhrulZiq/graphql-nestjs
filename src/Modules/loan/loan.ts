// import { IExchangeHub } from 'src/application/interface/exchangeHub.interface';
// import { Audit } from '../../audit/audit';
// import { Entity } from '@domain/entity';
// import { Result } from '@domain/result';
// import { Borrower } from '../borrower/borrower';

// export class ExchangeHub extends Entity implements IExchangeHub {
//   private _loanAmount: number;
//   private _totalInstallments: number;
//   private _outStandingAmount: number;
//   private _loanStartDate: string;
//   private _loanStatus: string;

//   private _audit: Audit;
//   constructor(id: string, props: IExchangeHub) {
//     super(id);
//     this.name = props.name;
//     this._audit = props.audit;
//   }

//   get name(): string {
//     return this._name;
//   }

//   set name(value: string) {
//     this._name = value;
//   }

//   get audit(): Audit {
//     return this._audit;
//   }

//   set audit(value: Audit) {
//     this._audit = value;
//   }

//   static create(props: IExchangeHub, id?: string): Result<ExchangeHub> {
//     return Result.ok<ExchangeHub>(new ExchangeHub(id, props));
//   }
// }
