import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany } from 'typeorm';

import { BaseModel } from './base.entity';
import { LoanModel } from './loan.entity';

@Entity({ name: 'borrower' })
@ObjectType()
export class BorrowerModel extends BaseModel {
  @Field()
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Field()
  @Column({ type: 'varchar', length: 100})
  phoneNumber: string;

  @Field(() => [LoanModel], { nullable: true })
  @OneToMany(() => LoanModel, (loan: LoanModel) => loan.borrower)
  loans?: LoanModel[];
}
