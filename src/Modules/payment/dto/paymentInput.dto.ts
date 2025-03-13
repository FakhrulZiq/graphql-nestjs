import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateBillInput {
  @Field()
  instalmentId: string;

  @Field()
  callbackUrl: string;

  @Field()
  redirectUrl: string;
}

@InputType()
export class BillStatusInput {
  @Field()
  billId: string;
}
