declare global {
  namespace NodeJS {
    interface ProcessEnv {
      /**
       * The environment the application is running in.
       */
      NEXT_PUBLIC_ENVIRONMENT: "development" | "production";
      /**
       * The URL of the application.
       */
      NEXT_PUBLIC_APP_URL: string;
      /**
       * The URL of the API. It is used in the `axios` instance to make requests to the API.
       */
      NEXT_PUBLIC_API_URL: string;
      /**
       * The key of the reCAPTCHA header. It is used in the `axios` instance to add the reCAPTCHA key to the request headers.
       */
      NEXT_PUBLIC_RECAPTCHA_HEADERS_KEY?: string;
      /**
       * The site key of the reCAPTCHA. It is used in the `reCAPTCHA` component to render the reCAPTCHA.
       */
      NEXT_PUBLIC_RECAPTCHA_SITE_KEY?: string;
    }
  }
}

declare global {
  /**
   * `RequestController` is the type of the request controller.
   */
  type RequestController = { id: string; controller: AbortController };
  interface Window {
    /**
     * `requestControllers` is the record of the request controllers.
     */
    requestControllers?: Record<string, RequestController>;
  }
}
export {};
