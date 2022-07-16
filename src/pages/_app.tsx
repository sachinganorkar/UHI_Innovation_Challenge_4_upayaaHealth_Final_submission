import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { themeChange } from "theme-change";
import "@fontsource/inter/latin.css";

import defaultSEOConfig from "../../next-seo.config";

import "lib/styles/globals.css";
import "lib/form/styles.scss";

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    themeChange(false);
    // 👆 false parameter is required for react project
  }, []);

  return (
    <div>
      <DefaultSeo {...defaultSEOConfig} />
      {
        // @ts-expect-error component
        <Component {...pageProps} />
      }
    </div>
  );
};

export default MyApp;
