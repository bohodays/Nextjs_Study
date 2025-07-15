"use client";

import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error.message);
  }, [error]);

  return (
    <div>
      <h3>검색 과정에서 오류가 발생했습니다.</h3>
      <button
        onClick={() => {
          startTransition(() => {
            // 서버 컴포넌트만 새롭게 렌더링 요청
            // 현재 페이지에 필요한 서버 컴포넌트들을 다시 불러옴
            router.refresh();

            // 에러 상태를 초기화하고 컴포넌트들을 다시 렌더링
            reset();
          });
        }}
      >
        다시 시도
      </button>
    </div>
  );
}
