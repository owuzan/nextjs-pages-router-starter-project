import { createParametrizedRoute } from "@/utils/create-parametrized-route";

export const endpoints = {
  login: "/auth/login",
  register: "/auth/register",
  refreshToken: "/auth/refresh-token",
  getUser: createParametrizedRoute("/auth/user/[userId]", ["userId"]),
};
