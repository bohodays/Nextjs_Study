import { Suspense } from "react";
import Searchbar from "../components/searchbar";

export default function Layout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <div>
      {/* Suspense 컴포넌트로 감싸게 되면 자식 컴포넌트들은 사전 렌더링 과정에서 제외되고 클라이언트 측에서만 렌더링되도록 함 */}
      <Suspense fallback={<div>Loading ...</div>}>
        <Searchbar />
      </Suspense>

      {children}
    </div>
  );
}
