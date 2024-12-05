import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseModel } from './base.entity';
import { LoanModel } from './loan.entity';

@Entity({ name: 'installmentSchedule' })
@ObjectType()
export class InstallmentScheduleModel extends BaseModel {
  @Field()
  @Column({ type: 'int', nullable: false })
  installmentNumber: number;

  @Field()
  @Column({ type: 'varchar', length: 100, nullable: false })
  dueDate: string;

  @Field()
  @Column({ type: 'float', default: 0.0 })
  amountDue: number;

  @Field()
  @Column({ type: 'varchar', length: 100, nullable: false })
  status: string;

  @Field(() => LoanModel)
  @ManyToOne(() => LoanModel, (loan) => loan.installmentSchedules)
  loan: LoanModel;
}
