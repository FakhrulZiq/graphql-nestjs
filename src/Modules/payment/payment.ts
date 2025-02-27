import { IPayment } from 'src/applications/interfaces/payment.interface';
import { Audit } from 'src/domain/audit/audit';
import { Entity } from 'src/domain/entity';
import { Result } from 'src/domain/result';
import { updateEntity } from 'src/utilities/utils';

export class Payment extends Entity implements IPayment {
  loanId: string;
  paymentAmount: number;
  paymentDate: Date;
  paymentMethod: string;
  paymentStatus: string;
  audit: Audit;

  constructor(id: string, props: IPayment) {
    super(id);
    this.loanId = props.loanId;
    this.paymentAmount = props.paymentAmount;
    this.paymentDate = props.paymentDate;
    this.paymentMethod = props.paymentMethod;
    this.paymentStatus = props.paymentStatus;
    this.audit = props.audit;
  }

  static create(props: IPayment, id?: string): Result<Payment> {
    return Result.ok<Payment>(new Payment(id, props));
  }

  static update(
    props: Partial<IPayment>,
    payment: Payment,
    audit: Audit,
  ): Payment {
    return updateEntity(props, payment, audit);
  }
}
