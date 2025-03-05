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

  @Field()
  remark: string;

  @Field({ nullable: true })
  proofLink?: string;
}

@InputType()
export class TrackUserLoanInput {
  @Field()
  phoneNumber: string;
}
