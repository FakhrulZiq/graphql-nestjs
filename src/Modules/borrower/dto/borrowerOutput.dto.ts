import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class InstalmentDto {
  @Field()
  instalmentNumber: number;

  @Field()
  dueDate: string;

  @Field()
  amountDue: number;

  @Field()
  status: string;
}

@ObjectType()
export class TrackUserLoanResponseDto {
  @Field()
  loanId: string;

  @Field()
  loanAmount: number;

  @Field()
  outstandingAmount: number;

  @Field()
  currentMonthDue: number;

  @Field()
  carryOverAmount: number;

  @Field(() => [InstalmentDto])
  instalments: InstalmentDto[];
}
