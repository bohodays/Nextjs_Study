import { Html, Head, Main, NextScript } from "next/document";

/* next앱의 html을 설정하는 컴포넌트 / React의 index.html과 동일한 역할 */
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <div>글로벌 헤더</div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
