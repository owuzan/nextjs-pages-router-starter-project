import type { AppProps } from "next/app";
import "@/styles/globals.css";
import { AppWrapper } from "@/components/AppWrapper";
import TailwindIndicator from "@/components/TailwindIndicator";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppWrapper>
      {/* Header */}
      <Component {...pageProps} />
      {/* Footer */}
      <TailwindIndicator />
    </AppWrapper>
  );
}
