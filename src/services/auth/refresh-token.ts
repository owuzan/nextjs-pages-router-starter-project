import { endpoints } from "@/constants/endpoints";
import { createService } from "@/lib/axios/createService";

export type RefreshTokenServiceParams = {
  refreshToken: string;
};
export type RefreshTokenServiceResponse = {
  accessToken: string;
  refreshToken: string;
};

/**
 * This service is used to refresh the access token
 * !This is an example request. Delete this.
 */
export const refreshTokenService = createService.post<
  RefreshTokenServiceResponse,
  RefreshTokenServiceParams
>(endpoints.auth.refreshToken);
