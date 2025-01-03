import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AddBorrowerInput {
  @Field()
  name: string;

  @Field()
  phoneNumber: string;

  @Field()
  loanAmount: number;

  @Field()
  totalInstalments: number;
}
