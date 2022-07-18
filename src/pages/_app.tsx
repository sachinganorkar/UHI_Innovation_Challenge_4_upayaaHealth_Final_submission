import { Amplify } from "aws-amplify";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { themeChange } from "theme-change";
import "@fontsource/inter/latin.css";

import defaultSEOConfig from "../../next-seo.config";

import "lib/styles/globals.css";
import "lib/form/styles.scss";

Amplify.configure({
  ssr: true,
  Auth: {
    mandatorySignIn: false,
    region: process.env.NEXT_PUBLIC_APP_REGION,
    userPoolId: process.env.NEXT_PUBLIC_APP_USER_POOL_ID,
    identityPoolId: process.env.NEXT_PUBLIC_APP_IDENTITY_POOL_ID,
    userPoolWebClientId: process.env.NEXT_PUBLIC_APP_USER_POOL_CLIENT_ID,
  },
  API: {
    aws_appsync_graphqlEndpoint: process.env.NEXT_PUBLIC_APPSYNC_URL,
    aws_appsync_region: process.env.NEXT_PUBLIC_APP_REGION,
    aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",
  },
});

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
