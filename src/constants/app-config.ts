// You can add your application's general settings here.

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
};
