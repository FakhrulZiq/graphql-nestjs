import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserSetting } from './UserSettings';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'user' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  username: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  displayName?: string;

  @OneToOne(() => UserSetting)
  @JoinColumn()
  @Field({ nullable: true })
  settings?: UserSetting;
}
