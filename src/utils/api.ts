import { ErrorResponseType, SuccessResponseType } from "@/types/api";

/**
 * This function is used to create the success response
 * @param data - The data to be sent in the response
 * @returns The success response
 */
export const apiSuccessModel = <T = unknown>(
  data: T
): SuccessResponseType<T> => ({
  success: true,
  data,
  message: "",
});

/**
 * This function is used to create the error response
 * @param message - The message to be sent in the response
 * @returns The error response
 */
export const apiErrorModel = (
  message: string | null = null
): ErrorResponseType => ({
  success: false,
  data: null,
  message,
});
