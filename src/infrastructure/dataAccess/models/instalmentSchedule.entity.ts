import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseModel } from './base.entity';
import { LoanModel } from './loan.entity';

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
  dueDate: Date;

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
}
