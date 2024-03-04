import { toFormData } from "axios";
import { merge } from "lodash";
import { v4 } from "uuid";
import { api } from "@/lib/axios";
import type {
  BaseResponseType,
  GetServiceOptions,
  PostServiceOptions,
} from "@/types/api";
import type { AxiosRequestConfig } from "axios";
import { appConfig } from "@/constants/app-config";

/**
 * This function is used to handle the abort controller
 * It will abort the previous request if the new request is sent
 * It will remove the controller from the window object if the request is completed
 * It will remove the controller from the window object if the request is aborted
 * @param url
 * @param serviceOptions
 */
const controllerHandler = (
  /**
   * The url of the request
   */
  url: string,
  /**
   * The options of the request
   */
  serviceOptions: GetServiceOptions | PostServiceOptions
): {
  /**
   * This function is used to get the abort controller config
   */
  getConfig: () => AxiosRequestConfig;
  /**
   * This function is used to remove the controller from the window object
   */
  finallyHandler: () => void | null;
} => {
  /**
   * The id of the request
   */
  const id = v4();
  /**
   * The url instance of the request
   */
  const urlInstance = new URL(appConfig.apiUrl + url);
  /**
   * The key of the controller
   */
  const controllerKey =
    serviceOptions.customAbortKey ||
    (serviceOptions.abortWithQuery
      ? urlInstance.href
      : urlInstance.href.replace(urlInstance.search, ""));

  /**
   * This function is used to get the abort controller config
   */
  const getConfig = (): AxiosRequestConfig => {
    if (typeof window === "undefined") return {};
    const controllerConfig: AxiosRequestConfig = {};

    if (!serviceOptions.autoAbort) return {};
    window.requestControllers = window.requestControllers || {};
    const oldcontroller = window.requestControllers[controllerKey];
    if (oldcontroller) {
      oldcontroller.controller.abort();
    }
    const controller = new AbortController();
    window.requestControllers[controllerKey] = { id, controller };
    controllerConfig.signal = controller.signal;
    return controllerConfig;
  };

  /**
   * This function is used to remove the controller from the window object
   */
  const finallyHandler = () => {
    if (typeof window === "undefined") return;
    window.requestControllers = window.requestControllers || {};
    const controller = window.requestControllers[controllerKey];
    if (controller && controller.id === id) {
      delete window.requestControllers[controllerKey];
    }
  };

  return {
    getConfig,
    finallyHandler,
  };
};

/**
 * This function is used to handle the generic alert
 * It will show the error toast if the request is failed
 * @param res
 */
const apiCallGenericAlertHandler = <T = unknown>(
  /**
   * The response of the request
   */
  res: BaseResponseType<T>
) => {
  if (typeof window !== "undefined") {
    if (!res.success && res.message) {
      // toastError({
      //   title: "Error",
      //   description: res.message,
      // });
    }
  }
  return res;
};

/**
 * This function is used to get the formatted params
 * It will return the formatted params if the isFormData is true
 * It will return the params if the isFormData is false
 * @param isFormData
 * @param params
 */
const getFormattedParams = (isFormData: boolean, params: unknown): unknown => {
  return isFormData && params !== null && typeof params === "object"
    ? toFormData(params)
    : params;
};

/**
 * This function is used to create the get service
 * @param url The url of the request
 * @param axiosConfig The axios config of the request
 * @param serviceDefaultOptions The default options of the request
 * @returns The get service
 */
const createGetService = <T = unknown>(
  /**
   * The url of the request
   */
  url: string,
  /**
   * The axios config of the request
   */
  axiosConfig: AxiosRequestConfig | null = {},
  /**
   * The default options of the request
   */
  serviceDefaultOptions: GetServiceOptions | null = {}
): ((
  config?: AxiosRequestConfig | null,
  options?: GetServiceOptions | null
) => Promise<BaseResponseType<T>>) => {
  return async (config = {}, options = {}) => {
    const serviceOptions = merge(
      {
        autoAbort: true,
        abortWithQuery: true,
        autoGenericAlert: true,
      } as GetServiceOptions,
      serviceDefaultOptions || {},
      options || {}
    );
    const reCaptchaConfig: AxiosRequestConfig = {};
    const controller = controllerHandler(url, serviceOptions);
    const controllerConfig = controller.getConfig();

    if (serviceOptions?.reCaptchaToken) {
      reCaptchaConfig.headers = {
        [appConfig.recaptcha.headersKey]: serviceOptions.reCaptchaToken,
      };
    }

    const mergedConfig = merge(
      axiosConfig,
      config,
      reCaptchaConfig,
      controllerConfig
    );

    const response = await api
      .GET<T>(url, mergedConfig)
      .finally(controller.finallyHandler);
    if (serviceOptions.autoGenericAlert) {
      apiCallGenericAlertHandler(response);
    }
    return response;
  };
};

/**
 * This function is used to create the post service
 * @param url The url of the request
 * @param axiosConfig The axios config of the request
 * @param serviceDefaultOptions The default options of the request
 * @returns The post service
 */
const createPostService = <T = unknown, P = unknown>(
  /**
   * The url of the request
   */
  url: string,
  /**
   * The axios config of the request
   */
  axiosConfig: AxiosRequestConfig | null = {},
  /**
   * The default options of the request
   */
  serviceDefaultOptions: PostServiceOptions | null = {}
): ((
  params?: P,
  config?: AxiosRequestConfig | null,
  options?: PostServiceOptions
) => Promise<BaseResponseType<T>>) => {
  return async (params, config = {}, options = {}) => {
    const serviceOptions = merge(
      {
        autoAbort: true,
        abortWithQuery: true,
        autoGenericAlert: true,
      } as GetServiceOptions,
      serviceDefaultOptions,
      options
    );
    const isFormData: boolean = serviceOptions.isFormData || false;
    const formDataConfig: AxiosRequestConfig = {};
    const reCaptchaConfig: AxiosRequestConfig = {};
    const controller = controllerHandler(url, serviceOptions);
    const controllerConfig = controller.getConfig();

    if (isFormData) {
      formDataConfig.headers = {
        "Content-Type": "multipart/form-data",
      };
    }
    if (serviceOptions.reCaptchaToken) {
      reCaptchaConfig.headers = {
        [appConfig.recaptcha.headersKey]: serviceOptions.reCaptchaToken,
      };
    }

    const mergedConfig = merge(
      axiosConfig,
      config,
      formDataConfig,
      reCaptchaConfig,
      controllerConfig
    );

    const formattedParams = getFormattedParams(isFormData, params);

    const response = await api
      .POST<T>(url, formattedParams, mergedConfig)
      .finally(controller.finallyHandler);
    if (serviceOptions.autoGenericAlert) {
      apiCallGenericAlertHandler(response);
    }
    return response;
  };
};

/**
 * This function is used to create the put service
 * @param url The url of the request
 * @param axiosConfig The axios config of the request
 * @param serviceDefaultOptions The default options of the request
 * @returns The put service
 */
const createPutService = <T = unknown, P = unknown>(
  url: string,
  axiosConfig: AxiosRequestConfig | null = {},
  serviceDefaultOptions: PostServiceOptions | null = {}
): ((
  params?: P,
  config?: AxiosRequestConfig | null,
  options?: PostServiceOptions
) => Promise<BaseResponseType<T>>) => {
  return async (params, config = {}, options = {}) => {
    const serviceOptions = merge(
      {
        autoAbort: true,
        abortWithQuery: true,
        autoGenericAlert: true,
      } as GetServiceOptions,
      serviceDefaultOptions,
      options
    );
    const isFormData: boolean = serviceOptions.isFormData || false;
    const formDataConfig: AxiosRequestConfig = {};
    const reCaptchaConfig: AxiosRequestConfig = {};
    const controller = controllerHandler(url, serviceOptions);
    const controllerConfig = controller.getConfig();

    if (isFormData) {
      formDataConfig.headers = {
        "Content-Type": "multipart/form-data",
      };
    }
    if (serviceOptions.reCaptchaToken) {
      reCaptchaConfig.headers = {
        [appConfig.recaptcha.headersKey]: serviceOptions.reCaptchaToken,
      };
    }

    const mergedConfig = merge(
      axiosConfig,
      config,
      formDataConfig,
      reCaptchaConfig,
      controllerConfig
    );

    const formattedParams = getFormattedParams(isFormData, params);

    const response = await api
      .PUT<T>(url, formattedParams, mergedConfig)
      .finally(controller.finallyHandler);
    if (serviceOptions.autoGenericAlert) {
      apiCallGenericAlertHandler(response);
    }
    return response;
  };
};

/**
 * This function is used to create the patch service
 * @param url The url of the request
 * @param axiosConfig The axios config of the request
 * @param serviceDefaultOptions The default options of the request
 * @returns The patch service
 */
const createPatchService = <T = unknown, P = unknown>(
  /**
   * The url of the request
   */
  url: string,
  /**
   * The axios config of the request
   */
  axiosConfig: AxiosRequestConfig | null = {},
  /**
   * The default options of the request
   */
  serviceDefaultOptions: PostServiceOptions | null = {}
): ((
  params?: P,
  config?: AxiosRequestConfig | null,
  options?: PostServiceOptions
) => Promise<BaseResponseType<T>>) => {
  return async (params, config = {}, options = {}) => {
    const serviceOptions = merge(
      {
        autoAbort: true,
        abortWithQuery: true,
        autoGenericAlert: true,
      } as GetServiceOptions,
      serviceDefaultOptions,
      options
    );
    const isFormData: boolean = serviceOptions.isFormData || false;
    const formDataConfig: AxiosRequestConfig = {};
    const reCaptchaConfig: AxiosRequestConfig = {};
    const controller = controllerHandler(url, serviceOptions);
    const controllerConfig = controller.getConfig();

    if (isFormData) {
      formDataConfig.headers = {
        "Content-Type": "multipart/form-data",
      };
    }
    if (serviceOptions.reCaptchaToken) {
      reCaptchaConfig.headers = {
        [appConfig.recaptcha.headersKey]: serviceOptions.reCaptchaToken,
      };
    }

    const mergedConfig = merge(
      axiosConfig,
      config,
      formDataConfig,
      reCaptchaConfig,
      controllerConfig
    );

    const formattedParams = getFormattedParams(isFormData, params);

    const response = await api
      .PATCH<T>(url, formattedParams, mergedConfig)
      .finally(controller.finallyHandler);
    if (serviceOptions.autoGenericAlert) {
      apiCallGenericAlertHandler(response);
    }
    return response;
  };
};

/**
 * This function is used to create the delete service
 * @param url The url of the request
 * @param axiosConfig The axios config of the request
 * @param serviceDefaultOptions The default options of the request
 * @returns The delete service
 */
const createDeleteService = <T = unknown>(
  /**
   * The url of the request
   */
  url: string,
  /**
   * The axios config of the request
   */
  axiosConfig: AxiosRequestConfig | null = {},
  /**
   * The default options of the request
   */
  serviceDefaultOptions: GetServiceOptions | null = {}
): ((
  config?: AxiosRequestConfig | null,
  options?: GetServiceOptions | null
) => Promise<BaseResponseType<T>>) => {
  return async (config = {}, options = {}) => {
    const serviceOptions = merge(
      {
        autoAbort: true,
        abortWithQuery: true,
        autoGenericAlert: true,
      } as GetServiceOptions,
      serviceDefaultOptions || {},
      options || {}
    );
    const reCaptchaConfig: AxiosRequestConfig = {};
    const controller = controllerHandler(url, serviceOptions);
    const controllerConfig = controller.getConfig();

    if (serviceOptions?.reCaptchaToken) {
      reCaptchaConfig.headers = {
        [appConfig.recaptcha.headersKey]: serviceOptions.reCaptchaToken,
      };
    }

    const mergedConfig = merge(
      axiosConfig,
      config,
      reCaptchaConfig,
      controllerConfig
    );

    const response = await api
      .DELETE<T>(url, mergedConfig)
      .finally(controller.finallyHandler);
    if (serviceOptions.autoGenericAlert) {
      apiCallGenericAlertHandler(response);
    }
    return response;
  };
};

/**
 * This object is used to create the service
 */
export const createService = {
  get: createGetService,
  post: createPostService,
  put: createPutService,
  patch: createPatchService,
  delete: createDeleteService,
};
