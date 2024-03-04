export const createParametrizedRoute = <T extends string[]>(
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
