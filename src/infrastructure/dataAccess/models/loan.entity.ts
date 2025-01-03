import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseModel } from './base.entity';
import { BorrowerModel } from './borrower.entity';
import { PaymentModel } from './payment.entity';
import { InstalmentScheduleModel } from './instalmentSchedule.entity';

@Entity({ name: 'loan' })
@ObjectType()
export class LoanModel extends BaseModel {
  @Field()
  @Column({ name: 'borrowerId' })
  borrowerId: string;

  @Field()
  @Column({ type: 'float', default: 0.0 })
  loanAmount: number;

  @Field()
  @Column({ type: 'int' })
  totalInstalments: number;

  @Field()
  @Column({ type: 'float', default: 0.0 })
  outStandingAmount: number;

  @Field()
  @Column({ type: 'varchar', length: 100 })
  loanStartDate: Date;

  @Field()
  @Column({ type: 'varchar', length: 100 })
  loanStatus: string;

  @Field()
  @Column({ type: 'varchar', length: 100, nullable: true })
  remark?: string;

  @Field()
  @Column({ type: 'varchar', length: 100, nullable: true })
  proofLink?: string;

  @Field(() => BorrowerModel)
  @JoinColumn({ name: 'borrowerId', referencedColumnName: 'id' })
  @ManyToOne(() => BorrowerModel, (borrower) => borrower.loans)
  borrower?: BorrowerModel;

  @Field(() => [PaymentModel], { nullable: true })
  @OneToMany(() => PaymentModel, (payment) => payment.loan)
  payments?: PaymentModel[];

  @Field(() => [InstalmentScheduleModel], { nullable: true })
  @OneToMany(() => InstalmentScheduleModel, (schedule) => schedule.loan)
  instalmentSchedules?: InstalmentScheduleModel[];
}
