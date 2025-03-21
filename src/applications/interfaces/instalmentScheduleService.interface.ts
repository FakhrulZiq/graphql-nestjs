export interface IInstalmentScheduleService {
  addInstalmentSchedule(
    loanAmount: number,
    totalInstallments: number,
    loanId: string,
    name: string,
  ): Promise<void>;
}

export interface ITotalPayPerMonth {
  instalmentNumber: number;
  amountDue: number;
  dueDate: string;
}
