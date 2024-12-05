import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowerModel } from '../models/borrower.entity';
import { InstallmentScheduleModel } from '../models/installmentSchedule.entity';
import { LoanModel } from '../models/loan.entity';
import { PaymentModel } from '../models/payment.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.getOrThrow('MYSQL_HOST'),
        port: config.getOrThrow('MYSQL_PORT'),
        database: config.getOrThrow('MYSQL_NAME'),
        username: config.getOrThrow('MYSQL_USERNAME'),
        password: config.getOrThrow('MYSQL_PASSWORD'),
        entities: [
          BorrowerModel,
          InstallmentScheduleModel,
          LoanModel,
          PaymentModel,
        ],
        autoLoadEntities: false,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
