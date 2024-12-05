import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateUserSettingsInput {
  @Field((type) => Int)
  userId: number;

  @Field()
  receiveNotifications: boolean;

  @Field()
  receiveEmails: boolean;
}
