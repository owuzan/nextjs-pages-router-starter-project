import { appConfig } from "@/constants/app-config";
import React, { FC } from "react";

type TailwindIndicatorProps = {};

const TailwindIndicator: FC<TailwindIndicatorProps> = (props) => {
  if (!appConfig.isDevelopment) {
    return null;
  }
  return (
    <div className="fixed bottom-10 left-0 right-0 flex justify-center pointer-events-none opacity-50">
      <p className="inline-flex items-center gap-2 bg-zinc-100 rounded px-2 py-0.5 border border-zinc-200 font-medium text-sm">
        <strong>Screen:</strong>
        <span className="sm:hidden">DEFAULT</span>
        <span className="hidden sm:block md:hidden">SM</span>
        <span className="hidden md:block lg:hidden">MD</span>
        <span className="hidden lg:block xl:hidden">XL</span>
        <span className="hidden xl:block">2XL</span>
      </p>
    </div>
  );
};

export default TailwindIndicator;
