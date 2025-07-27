import BookItem from "@/app/components/book-item";
import BookListSkeleton from "@/app/components/skeleton/book-list-skeleton";
import { BookData } from "@/types";
import delay from "@/util/delay";
import { Metadata } from "next";
import { Suspense } from "react";

async function SearchResult({ q }: { q: string }) {
  // 스트리밍을 확인하기 위한 임시 코드
  // await delay(1500);

  // Search 페이지는 searchParams와 같은 동적 함수로 의존하기 때문에 static 페이지로 설정할 수 없음
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
    // 데이터를 캐싱하는 방향으로 최적화 선택
    { cache: "force-cache" }
  );
  if (!response.ok) return <div>오류가 발생했습니다 ...</div>;

  const books: BookData[] = await response.json();

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

// 현재 페이지 메타 데이터를 동적으로 생성하는 역할을 함
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  return {
    title: `${q} : 한입북스 검색`,
    description: `${q}의 검색 결과입니다.`,
    openGraph: {
      title: `${q} : 한입북스 검색`,
      description: `${q}의 검색 결과입니다.`,
      images: ["/thumbnail.png"],
    },
  };
}

export default function Page({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  return (
    <Suspense
      key={searchParams.q || ""}
      fallback={<BookListSkeleton count={3} />}
    >
      <SearchResult q={searchParams.q ?? ""} />
    </Suspense>
  );
}
