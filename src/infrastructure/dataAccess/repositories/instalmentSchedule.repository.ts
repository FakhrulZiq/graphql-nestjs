import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InstalmentSchedule } from 'src/modules/InstalmentSchedule/InstalmentSchedule';
import { InstalmentScheduleMapper } from 'src/modules/InstalmentSchedule/InstalmentSchedule.mapper';
import { IInstalmentScheduleRepository } from 'src/applications/interfaces/instalmentScheduleRepository.interface';
import { Repository } from 'typeorm';
import { InstalmentScheduleModel } from '../models/InstalmentSchedule.entity';
import { GenericSqlRepository } from './generic.repository';

@Injectable()
export class InstalmentScheduleRepository
  extends GenericSqlRepository<InstalmentSchedule, InstalmentScheduleModel>
  implements IInstalmentScheduleRepository
{
  instalmentScheduleMapper: InstalmentScheduleMapper;
  constructor(
    @InjectRepository(InstalmentScheduleModel)
    repository: Repository<InstalmentScheduleModel>,
    mapper: InstalmentScheduleMapper,
  ) {
    super(repository, mapper);
    this.instalmentScheduleMapper = mapper;
  }
}
