import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { BaseModel } from './base.entity';
import { BorrowerModel } from './borrower.entity';
import { PaymentModel } from './payment.entity';
import { InstallmentScheduleModel } from './installmentSchedule.entity';

@Entity({ name: 'loan' })
@ObjectType()
export class LoanModel extends BaseModel {
  @Field()
  @Column({ type: 'float', default: 0.0 })
  loanAmount: number;

  @Field()
  @Column({ type: 'int', nullable: false })
  totalInstallments: number;

  @Field()
  @Column({ type: 'float', default: 0.0 })
  outStandingAmount: number;

  @Field()
  @Column({ type: 'varchar', length: 100, nullable: false })
  loanStartDate: string;

  @Field()
  @Column({ type: 'varchar', length: 100, nullable: false })
  loanStatus: string;

  @Field(() => BorrowerModel)
  @ManyToOne(() => BorrowerModel, (borrower) => borrower.loans)
  borrower: BorrowerModel;

  @Field(() => [PaymentModel], { nullable: true })
  @OneToMany(() => PaymentModel, (payment) => payment.loan)
  payments: PaymentModel[];

  @Field(() => [InstallmentScheduleModel], { nullable: true })
  @OneToMany(() => InstallmentScheduleModel, (schedule) => schedule.loan)
  installmentSchedules: InstallmentScheduleModel[];
}
