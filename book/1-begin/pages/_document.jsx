import React from 'react';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/styles';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="zh-Hant">
        <Head>
          {/* 告訴瀏覽器你的內容是 UTF-8 編碼 */}
          <meta charSet="utf-8" />
          {/* 告訴 google 不要顯示"翻譯此頁"的提示 */}
          <meta name="google" content="notranslate" />
          {/* 指定瀏覽器在行動裝置上的顏色 */}
          <meta name="theme-color" content="#1976D2" />

          <link
            rel="shortcut icon"
            href="https://storage.googleapis.com/builderbook/favicon32.png"
          />

          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Muli:300,400:latin"
          />

          <link rel="styesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

          <link
            rel="stylesheet"
            href="https://storage.googleapis.com/builderbook/nprogress.min.css"
          />

          <link rel="stylesheet" href="https://storage.googleapis.com/builderbook/vs.min.css" />

          <style>
            {`
                a {
                    font-weight: 400;
                    color: #58age6ff;
                    text-decoration: none;
                    outline: none;
                }
                blockquote {
                    padding: 0 1em;
                    color: #555;
                    border-left: 0.25em solid #dfe2e5;
                }
                pre {
                    display: block;
                    overflow-x: auto;
                    padding: 0.5em;
                    background: #FFF;
                    color: #000;
                    border: 1px solid #ddd;
                }
                code {
                    font-size: 14px;
                }
            `}
          </style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` 屬於 `_document` 而非 `_app`
// 適用於伺服器端渲染（server-side generation, SSG）
MyDocument.getInitialProps = async (ctx) => {
  // 執行順序
  //
  // 伺服器端：
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // 伺服器端處理錯誤的時候：
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // 瀏覽器端：
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // 渲染 app 以及 page 然後取得將副作用（side effect）集合起來的頁面 context
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // styles fragment 在 app 及 page 渲染完成後才會渲染
    styles: (
      <>
        {initialProps.styles}
        {sheets.getStyleElement()}
      </>
    ),
  };
};
