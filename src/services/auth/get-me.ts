import { endpoints } from "@/constants/endpoints";
import { createService } from "@/lib/axios/createService";

export type GetUserServiceParams = {
  id: string;
};
export type GetUserServiceResponse = {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
};

/**
 * This service is used to get the user details
 * !This is an example request. Delete this.
 */
export const getUserService = (params: GetUserServiceParams) =>
  createService.get<GetUserServiceResponse>(
    endpoints.auth.getUser({ userId: params.id })
  );
