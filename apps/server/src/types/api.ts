export interface ApiSuccess<TData> {
  success: true;
  data: TData;
  message?: string;
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    requestId: string;
  };
}
