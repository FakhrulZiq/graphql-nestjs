import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoanResponseDto {
  @Field()
  name: string;

  @Field()
  phoneNumber: string;

  @Field()
  loanAmount: string;

  @Field()
  totalInstalments: string;

  @Field()
  outStandingAmount: string;

  @Field()
  loanStartDate: string;

  @Field()
  loanStatus: string;
}
