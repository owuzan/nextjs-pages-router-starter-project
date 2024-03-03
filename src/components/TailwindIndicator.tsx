import { appConfig } from "@/constants/app-config";
import React, { FC } from "react";

type TailwindIndicatorProps = {};

const TailwindIndicator: FC<TailwindIndicatorProps> = (props) => {
  if (!appConfig.isDevelopment) {
    return null;
  }
  return (
    <div className="fixed bottom-10 left-0 right-0 flex items-center justify-center gap-2 font-medium opacity-50 pointer-events-none">
      <strong>Screen:</strong>
      <span className="sm:hidden">DEFAULT</span>
      <span className="hidden sm:block md:hidden">SM</span>
      <span className="hidden md:block lg:hidden">MD</span>
      <span className="hidden lg:block xl:hidden">XL</span>
      <span className="hidden xl:block">2XL</span>
    </div>
  );
};

export default TailwindIndicator;
