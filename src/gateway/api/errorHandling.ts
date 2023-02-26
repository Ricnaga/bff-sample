import { AxiosError } from "axios";

export const catchStatusCodeError =
  <E extends string>(errors: Record<number, E>) =>
  (axiosError: AxiosError) => {
    const statusCode = axiosError.response?.status || 500;

    if (errors[statusCode]) {
      return Promise.reject(errors[statusCode]);
    }

    if (statusCode === 401) {
      return Promise.reject("AUTHENTICATION_ERROR_UNAUTHORIZED");
    }

    return Promise.reject(axiosError);
  };
