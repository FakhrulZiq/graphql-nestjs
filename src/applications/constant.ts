export const TYPES = {
  CognitoService: 'CognitoService',
  IBorrowerService: 'IBorrowerService',
  IBorrowerRepository: 'IBorrowerRepository',
  IApplicationLogger: 'IApplicationLogger',
  IInstalmentScheduleRepository: 'IInstalmentScheduleRepository',
  IInstalmentScheduleService: 'IInstalmentScheduleService',
  ILoanRepository: 'ILoanRepository',
  ILoanService: 'ILoanService',
};

export const CRUD_ACTION = {
  create: 'create',
  retrieve: 'retrieve',
  update: 'update',
  delete: 'delete',
};

export const INSTALMENT_STATUS = {
  pending: 'pending',
  paid: 'paid',
  unpaid: 'unpaid',
  upcoming: 'upcoming',
};

export const AUDIT_BY_SYSTEM = 'System';
