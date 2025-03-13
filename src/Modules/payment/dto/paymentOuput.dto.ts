import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaymentListResponse {
  @Field()
  instalmentId: string;

  @Field()
  date: string;

  @Field()
  amount: number;

  @Field()
  method: string;

  @Field()
  status: string;

  @Field()
  transactionId: string;
}

@ObjectType()
export class Bill {
  @Field()
  id: string;

  @Field()
  url: string;

  @Field()
  status: string;
}
