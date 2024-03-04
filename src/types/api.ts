/**
 * `SuccessResponseType` is the success response type of the API.
 */
type SuccessResponseType<T> = {
  /**
   * `success` indicates whether the request is successful.
   */
  success: true;
  /**
   * `message` is the message of the response.
   */
  message: string | null;
  /**
   * `data` is the data of the response.
   */
  data: T;
};

/**
 * `ErrorResponseType` is the error response type of the API.
 */
type ErrorResponseType = {
  /**
   * `success` indicates whether the request is successful.
   */
  success: false;
  /**
   * `message` is the message of the response.
   */
  message: string | null;
  /**
   * `data` is the data of the response.
   */
  data: null;
};

/**
 * `BaseResponseType` is the base response type of the API.
 */
export type BaseResponseType<T = unknown> =
  | SuccessResponseType<T>
  | ErrorResponseType;

/**
 * `ServiceOptions` is the options of the service.
 */
export type ServiceOptions = {
  /**
   * `isFormData` indicates whether the request data is a `FormData` object. It is used in the `axios` instance to set the `Content-Type` header to `multipart/form-data` if the request data is a `FormData` object.
   */
  isFormData?: boolean;
  /**
   * `reCaptchaToken` is the token of the reCAPTCHA. It is used in the `axios` instance to add the reCAPTCHA token to the request headers.
   */
  reCaptchaToken?: string;
  /**
   * `autoAbort` indicates whether the request should be aborted automatically when the component is unmounted. It is used in the `axios` instance to abort the request when the component is unmounted.
   */
  autoAbort?: boolean;
  /**
   * `abortWithQuery` indicates whether the request should be aborted with the query. It is used in the `axios` instance to abort the request with the query when the component is unmounted.
   */
  abortWithQuery?: boolean;
  /**
   * `customAbortKey` is the key of the custom abort. It is used in the `axios` instance to abort the request with the custom abort key when the component is unmounted.
   */
  customAbortKey?: string;
  /**
   * `autoGenericAlert` indicates whether the request should show a generic alert when the request is failed. It is used in the `axios` instance to show a generic alert when the request is failed.
   */
  autoGenericAlert?: boolean;
};

/**
 * `GetServiceOptions` is the options of the `GET` service.
 */
export type GetServiceOptions = Omit<ServiceOptions, "isFormData">;
/**
 * `PostServiceOptions` is the options of the `POST` service.
 */
export type PostServiceOptions = ServiceOptions;
/**
 * `PutServiceOptions` is the options of the `PUT` service.
 */
export type PutServiceOptions = ServiceOptions;
/**
 * `PatchServiceOptions` is the options of the `PATCH` service.
 */
export type PatchServiceOptions = ServiceOptions;
/**
 * `DeleteServiceOptions` is the options of the `DELETE` service.
 */
export type DeleteServiceOptions = Omit<ServiceOptions, "isFormData">;
