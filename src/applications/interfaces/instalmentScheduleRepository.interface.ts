import { InstalmentScheduleModel } from 'src/infrastructure/dataAccess/models/instalmentSchedule.entity';
import { InstalmentSchedule } from 'src/modules/InstalmentSchedule/InstalmentSchedule';
import { IGenericRepository } from './genricRepository.interface';

export interface IInstalmentScheduleRepository
  extends IGenericRepository<InstalmentSchedule, InstalmentScheduleModel> {}
