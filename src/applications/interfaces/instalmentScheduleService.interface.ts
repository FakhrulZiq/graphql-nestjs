export interface IInstalmentScheduleService {
  addInstalmentSchedule(
    loanAmount: number,
    totalInstallments: number,
    loanId: string,
  ): Promise<void>;
}

export interface ITotalPayPerMonth {
  instalmentNumber: number;
  amountDue: number;
  dueDate: Date;
}
