import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'user_settings' })
@ObjectType()
export class UserSetting {
  @PrimaryColumn()
  @Field((type) => Int)
  userId: number;

  @Column({ default: false })
  @Field({ defaultValue: false })
  receiveNotification: boolean;

  @Column({ default: false })
  @Field({ defaultValue: false })
  receiveEmail: boolean;
}
