const createParametrizedRoute = <T extends string[]>(
  route: string,
  params: T
) => {
  const fn = (routesParams: {
    [K in (typeof params)[number]]: string;
  }) => {
    let path = route;
    const p = Object.keys(routesParams);
    p.map((param) => {
      path = path.replaceAll(
        `[${param}]`,
        routesParams[param as keyof typeof routesParams]
      );
    });
    return path;
  };
  return fn;
};

// You can define the routes of the application page here.
export const routes = {
  home: "/",
  features: {
    DEFAULT: "/features",
    feature1: "/features/feature1",
  },
  projects: {
    DEFAULT: "/projects",
    project: createParametrizedRoute("/project/[projectId]", [
      "projectId",
    ] as const),
  },
} as const;

// Example usage:
//
// import { routes } from "@/constants/routes";
//
// const feature1Path = routes.features.feature1;
// const projectPath = routes.projects.project({ projectId: "7e3d0a97-7cab-4bd7-b93c-84ef763fa89b" });
//
// console.log(feature1Path);
//// Output: /features/feature1
//
// console.log(projectPath);
//// Output: /project/7e3d0a97-7cab-4bd7-b93c-84ef763fa89b
