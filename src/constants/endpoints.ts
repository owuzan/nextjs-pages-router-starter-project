import { createParametrizedRoute } from "@/utils/create-parametrized-route";

/**
 * This file contains all the endpoints used in the application
 * The endpoints are used to make the API requests
 */
export const endpoints = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    refreshToken: "/auth/refresh-token",
    getUser: createParametrizedRoute("/auth/user/[userId]", ["userId"]),
  },
};
