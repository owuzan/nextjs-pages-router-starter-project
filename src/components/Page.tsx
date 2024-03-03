import { appConfig } from "@/constants/app-config";
import Head from "next/head";
import React, { FC, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { routes } from "@/constants/routes";
import { useAuth } from "@/hooks/custom/use-auth";
import { cn } from "@/utils/cn";

type PageProps = {
  /**
   * The title of the page
   */
  title?: string;
  /**
   * The description of the page
   */
  description?: string;
  /**
   * The authorization level of the page
   */
  authorization?: "public" | "private" | "guest";
  /**
   * The redirect path if the user is not authorized
   */
  redirect?: string;
  /**
   * Whether the page should be indexed by search engines
   */
  noIndex?: boolean;
  /**
   * The class name of the page
   */
  className?: string;
  /**
   * The children of the page
   */
  children?: React.ReactNode;
};

const Page: FC<PageProps> = (props) => {
  const {
    title,
    description,
    authorization = "public",
    redirect = routes.home,
    noIndex = false,
    className,
    children,
  } = props;
  const router = useRouter();
  const { isUserLoading, isUserLoggedIn } = useAuth();

  const titleSeperator = "—";
  const titleText = useMemo(() => {
    if (!title?.trim()) {
      return [appConfig.name, titleSeperator, appConfig.slogan].join(" ");
    }
    return [title.trim(), titleSeperator, appConfig.name].join(" ");
  }, [title]);

  const robotsContent = useMemo((): string => {
    if (!appConfig.isProduction) return "noindex, nofollow";
    if (noIndex) return "noindex, nofollow";
    if (authorization === "private") return "noindex, nofollow";
    return "index, follow";
  }, [authorization, noIndex]);

  const metaDescriptionContent = useMemo(() => {
    const d = description?.trim();
    if (!d) return appConfig.description;
    if (d.length > 160) return `${d.slice(0, 160)}...`;
    return d;
  }, [description]);

  useEffect(() => {
    if (isUserLoading) return;
    if (authorization === "private" && !isUserLoggedIn) {
      router.push(redirect);
    }
    if (authorization === "guest" && isUserLoggedIn) {
      router.push(redirect);
    }
  }, [authorization, isUserLoggedIn, isUserLoading, redirect, router]);

  if (authorization === "private" && isUserLoading) return null;
  if (authorization === "private" && !isUserLoggedIn) return null;
  if (authorization === "guest" && isUserLoggedIn) return null;

  return (
    <div className={cn("flex-1", className)}>
      <Head>
        <title>{titleText}</title>
        <meta name="description" content={metaDescriptionContent} />
        <meta name="robots" content={robotsContent} />
      </Head>
      {children}
    </div>
  );
};

export default Page;
