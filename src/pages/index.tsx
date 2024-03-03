import React from "react";
import { NextPage } from "next";
import Page from "@/components/Page";
import { cn } from "@/utils/cn";
import { routes } from "@/constants/routes";

type HomePageProps = {};

const HomePage: NextPage<HomePageProps> = (props) => {
  return (
    <Page>
      {routes.projects.project({
        projectId: "7e3d0a97-7cab-4bd7-b93c-84ef763fa89b",
      })}
    </Page>
  );
};

export default HomePage;
