import { Response } from "express";

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data: T;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  const response: any = {
    success: data?.success,
    statusCode: data?.statusCode,
    message: data?.message,
    data: data?.data,
  };

  if (data?.success) {
    response.statusCode = data?.statusCode;
  }

  res.status(data?.statusCode).json(response);
};

export default sendResponse;
