import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseModel } from './base.entity';
import { LoanModel } from './loan.entity';

@Entity({ name: 'payment' })
@ObjectType()
export class PaymentModel extends BaseModel {
  @Field()
  @Column({ name: 'loanId' })
  loanId: string;

  @Field()
  @Column({ type: 'float', default: 0.0 })
  paymentAmount: number;

  @Field()
  @Column({ type: 'varchar', length: 100 })
  paymentDate: Date;

  @Field()
  @Column({ type: 'varchar', length: 100 })
  paymentMethod: string;

  @Field()
  @Column({ type: 'varchar', length: 100 })
  paymentStatus: string;

  @Field(() => LoanModel)
  @JoinColumn({ name: 'loanId', referencedColumnName: 'id' })
  @ManyToOne(() => LoanModel, (loan: LoanModel) => loan.payments)
  loan?: LoanModel;
}
