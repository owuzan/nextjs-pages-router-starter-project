import { store } from "@/store";
import React, { FC } from "react";
import { Provider as ReduxProvider } from "react-redux";

export type ProvidersProps = {
  children?: React.ReactNode;
};

export const AppWrapper: FC<ProvidersProps> = (props) => {
  const { children } = props;

  return <ReduxProvider store={store}>{children}</ReduxProvider>;
};
