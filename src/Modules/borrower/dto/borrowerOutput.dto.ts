import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class InstalmentDto {
  @Field()
  id: string;

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
  loanAmount: string;

  @Field()
  outstandingAmount: string;

  @Field()
  currentMonthDue: string;

  @Field()
  carryOverAmount: number;

  @Field(() => [InstalmentDto])
  instalments: InstalmentDto[];
}

@ObjectType()
export class NewBorrowerResponseDto {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  phoneNumber: string;
}

@ObjectType()
export class LoanListDto {
  @Field()
  loanAmount: number;

  @Field()
  loanStartDate: string;

  @Field()
  loanStatus: string;

  @Field()
  totalInstalments: number;

  @Field()
  outStandingAmount: number;

  @Field({ nullable: true })
  remark?: string;
}

@ObjectType()
export class BorrowerListResponseDto {
  @Field()
  name: string;

  @Field()
  phoneNumber: string;

  @Field(() => [LoanListDto])
  loans: LoanListDto[];
}
