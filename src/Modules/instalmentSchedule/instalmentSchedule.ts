import { IInstalmentSchedule } from 'src/applications/interfaces/InstalmentSchedule.interface';
import { Audit } from 'src/domain/audit/audit';
import { Entity } from 'src/domain/entity';
import { Result } from 'src/domain/result';
import { updateEntity } from 'src/utilities/utils';

export class InstalmentSchedule extends Entity implements IInstalmentSchedule {
  instalmentNumber: number;
  dueDate: Date;
  amountDue: number;
  status: string;
  loanId: string;
  audit: Audit;

  constructor(id: string, props: IInstalmentSchedule) {
    super(id);
    this.instalmentNumber = props.instalmentNumber;
    this.dueDate = props.dueDate;
    this.amountDue = props.amountDue;
    this.status = props.status;
    this.loanId = props.loanId;
    this.audit = props.audit;
  }

  static create(
    props: IInstalmentSchedule,
    id?: string,
  ): Result<InstalmentSchedule> {
    return Result.ok<InstalmentSchedule>(new InstalmentSchedule(id, props));
  }

  static update(
    props: Partial<IInstalmentSchedule>,
    InstalmentSchedule: InstalmentSchedule,
    audit: Audit,
  ): InstalmentSchedule {
    return updateEntity(props, InstalmentSchedule, audit);
  }
}
