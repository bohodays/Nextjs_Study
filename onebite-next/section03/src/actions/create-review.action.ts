"use server";

import { revalidatePath } from "next/cache";

export async function createReviewAction(formData: FormData) {
  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  if (!bookId || !content || !author) {
    return;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: "POST",
        body: JSON.stringify({
          bookId,
          content,
          author,
        }),
      }
    );

    // 주의할 점
    // 1. revalidatePath 메서드는 오직 서버 측에서만 호출할 수 있음
    // 2. revalidatePath 메서드는 해당 경로에 포함된 모든 캐시를 무효화함
    //   - 풀 라우트 캐시는 새로 업데이트 되지 않음 (풀 라우트 캐시도 무효화함)
    //   - 최신 데이터를 보장하기 위해
    // 종류
    // 1. option을 사용하지 않는 경우 (특정 주소의 해당하는 페이지만 재검증)
    // 2. 특정 경로의 모든 동적 페이지를 재검증
    //   - revalidatePath("/book/[id]", "page");
    // 3. 특정 레이아웃을 갖는 모든 페이지 재검증
    //   - revalidatePath("/(with-searchbar)", "layout");
    // 4. 모든 데이터 재검증
    //   - revalidatePath("/", "layout");
    // 5. 태그 기준, 데이터 캐시 재검증
    //   - revalidateTag('review-bookId');
    // const response = await fetch(
    //   `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
    //   { next: { tags: ['review-bookId'] } }
    // );
    revalidatePath(`/book/${bookId}`); // 재검증 (서버 액션 후 넥스트 서버에 페이지 다시 생성 요청)
  } catch (e) {
    console.error(e);
  }
}
