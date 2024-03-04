import { endpoints } from "@/constants/endpoints";
import type { BaseResponseType } from "@/types/api";
import { api } from ".";
import type {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { appConfig } from "@/constants/app-config";
import {
  RefreshTokenServiceParams,
  RefreshTokenServiceResponse,
} from "@/services/auth/refresh-token";
import { apiErrorModel } from "@/utils/api";
import {
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "@/utils/auth";

/**
 * This interceptor is used to add the access token to the request headers
 */
export const requestTokenizerInterceptor = (
  /**
   * `config` is the config of the request.
   */
  config: InternalAxiosRequestConfig<unknown>
): InternalAxiosRequestConfig<unknown> => {
  const token = getAccessToken();
  if (token) {
    config.headers[appConfig.authorization.headersKey] = `Bearer ${token}`;
  }
  return config;
};

/**
 * This interceptor is used to handle the unauthorized response
 */
export const unauthorizedResponseInterceptor = {
  /**
   * This function is used to handle the successful response
   */
  onFullFilled: (response: AxiosResponse) => {
    return response.data;
  },
  /**
   * It will try to refresh the access token if the refresh token is available
   * If the refresh token is not available, it will remove the access token and refresh token from the cookies
   * If the refresh token is available, it will try to refresh the access token
   * If the refresh token is expired, it will remove the access token and refresh token from the cookies
   * If the refresh token is valid, it will set the new access token and refresh token to the cookies
   */
  onRejected: async (
    error: AxiosError<BaseResponseType>
  ): Promise<BaseResponseType> => {
    if (error.response?.status === 401) {
      const refreshToken = getRefreshToken();
      if (refreshToken === null) {
        removeAccessToken();
        removeRefreshToken();
      } else {
        return api
          .POST<RefreshTokenServiceResponse>(endpoints.auth.refreshToken, {
            refreshToken,
          } as RefreshTokenServiceParams)
          .then(async (response): Promise<BaseResponseType> => {
            if (response.success) {
              const { accessToken, refreshToken } = response.data;
              setAccessToken(accessToken);
              setRefreshToken(refreshToken);
              return await api.request({
                ...error.config,
                headers: {
                  ...error.config?.headers,
                  [appConfig.authorization.headersKey]: `Bearer ${accessToken}`,
                },
              });
            } else {
              removeAccessToken();
              removeRefreshToken();
              return apiErrorModel(error.message);
            }
          })
          .catch((error): BaseResponseType => {
            removeAccessToken();
            removeRefreshToken();
            return apiErrorModel(error.message);
          });
      }
    }
    return error.response?.data || apiErrorModel(error.message);
  },
};
