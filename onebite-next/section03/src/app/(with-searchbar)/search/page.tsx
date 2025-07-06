import BookItem from "@/app/components/book-item";
import { BookData } from "@/types";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  // Search 페이지는 searchParams와 같은 동적 함수로 의존하기 때문에 static 페이지로 설정할 수 없음
  const { q } = await searchParams;

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
