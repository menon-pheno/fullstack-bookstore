import PropTypes from "prop-types";
import { CacheProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Head from "next/head";

import createEmotionCache from "../styling/createEmotionCache";
import basicTheme from "../styling/themes/basicTheme";

// 瀏覽器端的 cache, 使用者於瀏覽器的整個 session 內會共用
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={basicTheme}>
        {/* CssBaseline 會提供一個一致的 CSS 基準線 */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
