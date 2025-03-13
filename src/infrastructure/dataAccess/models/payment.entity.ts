import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseModel } from './base.entity';
import { InstalmentScheduleModel } from './instalmentSchedule.entity';

@Entity({ name: 'payment' })
@ObjectType()
export class PaymentModel extends BaseModel {
  @Field()
  @Column({ name: 'instalmentId' })
  instalmentId: string;

  @Field()
  @Column({ type: 'float', default: 0.0 })
  paymentAmount: number;

  @Field()
  @Column({ type: 'varchar', length: 100 })
  paymentDate: string;

  @Field()
  @Column({ type: 'varchar', length: 100 })
  paymentMethod: string;

  @Field()
  @Column({ type: 'varchar', length: 100 })
  paymentStatus: string;

  @Field()
  @Column({ type: 'varchar', length: 100 })
  transactionId: string;

  @Field(() => InstalmentScheduleModel)
  @JoinColumn({ name: 'instalmentId', referencedColumnName: 'id' })
  @ManyToOne(
    () => InstalmentScheduleModel,
    (instalment: InstalmentScheduleModel) => instalment.payments,
  )
  instalment?: InstalmentScheduleModel;
}
