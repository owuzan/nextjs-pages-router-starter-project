import axios from "axios";
import {
  requestTokenizerInterceptor,
  unauthorizedResponseInterceptor,
} from "./interceptors";
import type { AxiosRequestConfig } from "axios";
import { appConfig } from "@/constants/app-config";
import { getAccessToken } from "@/utils/auth";
import { BaseResponseType } from "@/types/api";

/**
 * `defaultInstance` is the default instance of the `axios`.
 */
const defaultInstance = axios.create({
  baseURL: appConfig.apiUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

defaultInstance.interceptors.request.use(requestTokenizerInterceptor);
defaultInstance.interceptors.response.use(
  unauthorizedResponseInterceptor.onFullFilled,
  unauthorizedResponseInterceptor.onRejected
);

/**
 * `GET` request
 * @param url string
 * @param config AxiosRequestConfig
 * @returns Promise<BaseResponseType<T>>
 */
const GET = async <T = unknown>(
  /**
   * `url` is the URL of the request.
   */
  url: string,
  /**
   * `config` is the config of the request.
   */
  config?: AxiosRequestConfig
): Promise<BaseResponseType<T>> => {
  return await defaultInstance.get(url, config);
};

/**
 * `POST` request
 * @param url string
 * @param params unknown
 * @param config AxiosRequestConfig
 * @returns Promise<BaseResponseType<T>>
 */
const POST = async <T = unknown>(
  /**
   * `url` is the URL of the request.
   */
  url: string,
  /**
   * `params` is the params of the request.
   */
  params: unknown,
  /**
   * `config` is the config of the request.
   */
  config?: AxiosRequestConfig
): Promise<BaseResponseType<T>> => {
  return await defaultInstance.post(url, params, config);
};

/**
 * `PUT` request
 * @param url string
 * @param params unknown
 * @param config AxiosRequestConfig
 * @returns Promise<BaseResponseType<T>>
 */
const PUT = async <T = unknown>(
  /**
   * `url` is the URL of the request.
   */
  url: string,
  /**
   * `params` is the params of the request.
   */
  params: unknown,
  /**
   * `config` is the config of the request.
   */
  config?: AxiosRequestConfig
): Promise<BaseResponseType<T>> => {
  return await defaultInstance.put(url, params, config);
};

/**
 * `PATCH` request
 * @param url string
 * @param params unknown
 * @param config AxiosRequestConfig
 * @returns Promise<BaseResponseType<T>>
 */
const PATCH = async <T = unknown>(
  /**
   * `url` is the URL of the request.
   */
  url: string,
  /**
   * `params` is the params of the request.
   */
  params: unknown,
  /**
   * `config` is the config of the request.
   */
  config?: AxiosRequestConfig
): Promise<BaseResponseType<T>> => {
  return await defaultInstance.patch(url, params, config);
};

/**
 * `DELETE` request
 * @param url string
 * @param config AxiosRequestConfig
 * @returns Promise<BaseResponseType<T>>
 */
const DELETE = async <T = unknown>(
  /**
   * `url` is the URL of the request.
   */
  url: string,
  /**
   * `config` is the config of the request.
   */
  config?: AxiosRequestConfig
): Promise<BaseResponseType<T>> => {
  return await defaultInstance.delete(url, config);
};

/**
 * `api` is the instance of the `axios`.
 */
export const api = {
  GET,
  POST,
  PUT,
  PATCH,
  DELETE,
  request: defaultInstance.request,
};
