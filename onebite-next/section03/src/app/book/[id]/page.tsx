import { BookData } from "@/types";
import style from "./page.module.css";
import { notFound } from "next/navigation";

/**
 * generateStaticParams로 설정된 id 1,2,3 값 외에는 404 페이지로 이동시킴
 */
// export const dynamicParams = false;

/**
 * 정적인 파라미터를 생성하는 함수
 * 약속된 함수
 */
export function generateStaticParams() {
  // Next 서버가 build time에 정적 파라미터를 읽어서 해당하는 북페이지를 정적으로 만듦
  // 문자열 데이터만 가능함
  // 페이지 라우터의 getStaticPath와 동일한 역할을 함
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string | string[] }>;
}) {
  const { id } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`
  );
  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    return <div>오류가 발생했습니다 ...</div>;
  }

  const book: BookData = await response.json();

  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
