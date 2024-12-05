import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BorrowerResponseDto {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  phoneNumber: string;

  @Field()
  loanAmount: number;

  @Field()
  totalInstallments: number;
}
