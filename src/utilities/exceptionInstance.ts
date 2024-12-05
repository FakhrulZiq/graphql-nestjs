export const applicationError = (error: any, data?: any, stack?: any) => {
  if (error.errorMessage) {
    return error;
  }
  return {
    errorMessage: error?.message || error,
    data,
    errorInfo: stack,
  };
};
