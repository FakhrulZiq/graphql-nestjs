import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
export class BaseModel {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @CreateDateColumn()
  @Field(() => GraphQLISODateTime)
  auditCreatedDateTime: string;

  @Column({ type: 'varchar', length: 50 })
  @Field()
  auditCreatedBy: string;

  @UpdateDateColumn()
  @Field(() => GraphQLISODateTime, { nullable: true })
  auditModifiedDateTime?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @Field({ nullable: true })
  auditModifiedBy?: string;

  @DeleteDateColumn()
  @Field(() => GraphQLISODateTime, { nullable: true })
  auditDeletedDateTime?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @Field({ nullable: true })
  auditDeletedBy?: string;
}
