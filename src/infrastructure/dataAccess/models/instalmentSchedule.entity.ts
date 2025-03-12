import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseModel } from './base.entity';
import { LoanModel } from './loan.entity';
import { PaymentModel } from './payment.entity';

@Entity({ name: 'instalmentSchedule' })
@ObjectType()
export class InstalmentScheduleModel extends BaseModel {
  @Field()
  @Column({ name: 'loanId' })
  loanId: string;

  @Field()
  @Column({ type: 'int' })
  instalmentNumber: number;

  @Field()
  @Column({ type: 'varchar', length: 100 })
  dueDate: string;

  @Field()
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  amountDue: number;

  @Field()
  @Column({ type: 'varchar', length: 100 })
  status: string;

  @Field(() => LoanModel)
  @JoinColumn({ name: 'loanId', referencedColumnName: 'id' })
  @ManyToOne(() => LoanModel, (loan) => loan.instalmentSchedules)
  loan?: LoanModel;

  @Field(() => [PaymentModel], { nullable: true })
  @OneToMany(() => PaymentModel, (payment: PaymentModel) => payment.instalment)
  payments?: PaymentModel[];
}
