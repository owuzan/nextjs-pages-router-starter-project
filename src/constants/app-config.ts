import { AuthCookieKeys } from "@/types/auth";

export const appConfig = {
  /**
   * `name` is not used anywhere, but it will be fed from here when needed.
   */
  name: "Your app name",
  /**
   * `title` is used in `Page` component and is passed as the page title. When a title is given specifically to a page, this comes after `-`.
   */
  title: "Your app title",
  /**
   * `slogan` is used in `Page` component and comes after the page title. If there is a special page title, the slogan does not appear.
   */
  slogan: "Your app slogan",
  /**
   * `description` is used as a meta description in the `Page` component. When no specific definition is given for the page, this appears.
   */
  description: "Start your next project with this boilerplate.",
  /**
   * `version` is the version of the application.
   */
  version: "1.0.0",
  /**
   * `appUrl` is the URL of the application. It is used in the `Page` component to create the canonical URL.
   */
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "https://oguzhan.dev",
  /**
   * `apiUrl` is the URL of the API. It is used in the `axios` instance to make requests to the API.
   */
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "https://oguzhan.dev/api",
  /**
   * `isProductionEnvironment` indicates whether this application is in production environment, where everyone uses it.
   */
  isProductionEnvironment: process.env.NEXT_PUBLIC_ENVIRONMENT === "production",
  /**
   * `isDevelopmentEnvironment` indicates whether this application is in development environment, used only for testing purposes.
   */
  isDevelopmentEnvironment:
    process.env.NEXT_PUBLIC_ENVIRONMENT === "development",
  /**
   * `isProduction` indicates whether this application is running on the built version of the application.
   */
  isProduction: process.env.NODE_ENV === "production",
  /**
   * `isDevelopment` indicates whether this application is running in development environment.
   */
  isDevelopment: process.env.NODE_ENV === "development",
  /**
   * `isServer` indicates whether this application is running on the server side.
   */
  isServer: typeof window === "undefined",
  /**
   * `isClient` indicates whether this application is running on the client side.
   */
  isClient: typeof window !== "undefined",
  /**
   * `recaptcha` is the configuration of the reCAPTCHA.
   */
  recaptcha: {
    /**
     * `headersKey` is the key of the reCAPTCHA header. It is used in the `axios` instance to add the reCAPTCHA key to the request headers.
     */
    headersKey: process.env.NEXT_PUBLIC_RECAPTCHA_HEADERS_KEY || "",
    /**
     * `siteKey` is the site key of the reCAPTCHA. It is used in the `reCAPTCHA` component to render the reCAPTCHA.
     */
    siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "",
  },
  /**
   * `authorization` is the configuration of the authorization. It is used in the `axios` instance to add the token to the request headers and in the `auth` utility functions to get and set the token from the cookie.
   */
  authorization: {
    /**
     * `headersKey` is the key of the authorization header. It is used in the `axios` instance to add the token to the request headers.
     */
    headersKey: "Authorization",
    /**
     * `cookieTokenKey` is the key of the access token in the cookie. It is used in the `auth` utility functions to get and set the token from the cookie.
     */
    cookieTokenKey: AuthCookieKeys.ACCESS_TOKEN,
    /**
     * `cookieRefreshTokenKey` is the key of the refresh token in the cookie. It is used in the `auth` utility functions to get and set the refresh token from the cookie.
     */
    cookieRefreshTokenKey: AuthCookieKeys.REFRESH_TOKEN,
    /**
     * `isAccessTokenJWT` indicates whether the access token is a JWT token. It is used in the `auth` utility functions to check whether the token is a JWT token.
     */
    isAccessTokenJWT: true,
    /**
     * `isRefreshTokenJWT` indicates whether the refresh token is a JWT token. It is used in the `auth` utility functions to check whether the token is a JWT token.
     */
    isRefreshTokenJWT: false,
  },
};
