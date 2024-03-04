import jwt from "jsonwebtoken";
import nookies from "nookies";
import { AuthCookieKeys } from "@/types/auth";
import type { GetServerSidePropsContext, PreviewData } from "next";
import type { ParsedUrlQuery } from "querystring";
import { appConfig } from "@/constants/app-config";

const getAuthToken = (
  tokenType: AuthCookieKeys,
  ctx?: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
): string | null => {
  const cookies = nookies.get(ctx);
  const authToken = cookies[tokenType] || null;
  return authToken;
};

const setAuthToken = (
  tokenType: AuthCookieKeys,
  token: string | null,
  ctx?: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  if (!token) {
    nookies.destroy(ctx, tokenType, {
      path: "/",
    });
    return;
  }
  const decodedToken = jwt.decode(token) as jwt.JwtPayload;

  const isAccessToken = tokenType === AuthCookieKeys.ACCESS_TOKEN;
  const isJWT = isAccessToken
    ? appConfig.authorization.isAccessTokenJWT
    : appConfig.authorization.isRefreshTokenJWT;
  nookies.set(ctx, tokenType, token, {
    path: "/",
    maxAge: isJWT ? decodedToken.exp : undefined,
  });
};

const getAccessToken = (
  ctx?: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  return getAuthToken(AuthCookieKeys.ACCESS_TOKEN, ctx);
};

const setAccessToken = (
  token: string,
  ctx?: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  setAuthToken(AuthCookieKeys.ACCESS_TOKEN, token, ctx);
};

const removeAccessToken = (
  ctx?: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  setAuthToken(AuthCookieKeys.ACCESS_TOKEN, null, ctx);
};

const getRefreshToken = (
  ctx?: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  return getAuthToken(AuthCookieKeys.REFRESH_TOKEN, ctx);
};

const setRefreshToken = (
  refreshToken: string,
  ctx?: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  setAuthToken(AuthCookieKeys.REFRESH_TOKEN, refreshToken, ctx);
};

const removeRefreshToken = (
  ctx?: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  setAuthToken(AuthCookieKeys.REFRESH_TOKEN, null, ctx);
};

export {
  getAccessToken,
  setAccessToken,
  removeAccessToken,
  getRefreshToken,
  setRefreshToken,
  removeRefreshToken,
};
