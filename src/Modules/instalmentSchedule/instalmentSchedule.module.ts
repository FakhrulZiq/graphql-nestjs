import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstalmentScheduleModel } from 'src/infrastructure/dataAccess/models/instalmentSchedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InstalmentScheduleModel])],
  providers: [],
})
export class InstalmentScheduleModule {}
