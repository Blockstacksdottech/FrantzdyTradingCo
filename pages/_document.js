import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="layout-fixed layout-navbar-fixed hold-transition sidebar-mini">
        <div className="wrapper">
          <Main />
          <NextScript />
        </div>
      </body>
    </Html>
  );
}
