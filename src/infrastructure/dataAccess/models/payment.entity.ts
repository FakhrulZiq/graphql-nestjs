import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseModel } from './base.entity';
import { LoanModel } from './loan.entity';

@Entity({ name: 'payment' })
@ObjectType()
export class PaymentModel extends BaseModel {
  @Field()
  @Column({ type: 'float', default: 0.0 })
  paymentAmount: number;

  @Field()
  @Column({ type: 'varchar', length: 100, nullable: false })
  paymentDate: string;

  @Field()
  @Column({ type: 'varchar', length: 100, nullable: false })
  paymentMethod: string;

  @Field()
  @Column({ type: 'varchar', length: 100, nullable: false })
  paymentStatus: string;

  @Field(() => LoanModel)
  @ManyToOne(() => LoanModel, (loan: LoanModel) => loan.payments)
  loan: LoanModel;
}
