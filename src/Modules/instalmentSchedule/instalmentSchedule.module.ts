import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TYPES } from 'src/applications/constant';
import { InstalmentScheduleModel } from 'src/infrastructure/dataAccess/models/instalmentSchedule.entity';
import { InstalmentScheduleRepository } from 'src/infrastructure/dataAccess/repositories/instalmentSchedule.repository';
import { ApplicationLogger } from 'src/infrastructure/logger';
import { InstalmentScheduleService } from './instalmentSchedule.service';
import { InstalmentScheduleMapper } from './instalmentSchedule.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([InstalmentScheduleModel])],
  providers: [
    {
      provide: TYPES.IInstalmentScheduleService,
      useClass: InstalmentScheduleService,
    },
    {
      provide: TYPES.IInstalmentScheduleRepository,
      useClass: InstalmentScheduleRepository,
    },
    InstalmentScheduleMapper,
    { provide: TYPES.IApplicationLogger, useClass: ApplicationLogger },
  ],
})
export class InstalmentScheduleModule {}
