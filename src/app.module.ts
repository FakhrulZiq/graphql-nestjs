import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { DatabaseModule } from './infrastructure/dataAccess/database/database.module';
import { BorrowerModule } from './Modules/borrower/borrower.module';
import { PaymentModule } from './Modules/payment/payment.module';
import { InstalmentScheduleModule } from './Modules/instalmentSchedule/instalmentSchedule.module';
import { LoanModule } from './Modules/loan/loan.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), '/schema.gql'),
    }),
    DatabaseModule,
    BorrowerModule,
    PaymentModule,
    InstalmentScheduleModule,
    LoanModule,
  ],
})
export class AppModule {}
