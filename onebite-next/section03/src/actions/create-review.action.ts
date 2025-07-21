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
    revalidatePath(`/book/${bookId}`); // 재검증 (서버 액션 후 넥스트 서버에 페이지 다시 생성 요청)
  } catch (e) {
    console.error(e);
  }
}
