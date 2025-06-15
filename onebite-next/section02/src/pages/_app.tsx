import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Link 컴포넌트가 아니라 router로 페이지를 이동시키는 방식은 프리페칭이 적용되지 않는다.
  const onClickButton = () => {
    router.push("/test"); // Next는 react-router-dom 라이브러리의 useNavigate와 같은 기능을 자체적으로 제공한다.
  };

  useEffect(() => {
    // router로 이동시키는 페이지에 대한 프리페칭을 적용하는 방법
    router.prefetch("/test");
  }, []);

  return (
    <>
      <header>
        <Link href={"/"}>index</Link>
        &nbsp;
        {/* prefetch 속성을 false로 하면 프리페칭을 명시적으로 해제할 수 있음 */}
        <Link href={"/search"} prefetch={false}>
          search
        </Link>
        &nbsp;
        <Link href={"/book/1"}>book/1</Link>
        <div>
          <button onClick={onClickButton}>/test 페이지로 이동</button>
        </div>
      </header>
      <Component {...pageProps} />
    </>
  );
}
