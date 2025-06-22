import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import style from "./[id].module.css";
import fetchOneBook from "@/lib/fetch-one-book";
import { useRouter } from "next/router";

// [...id] -> Catch All Segments (중첩된 URL 경로도 포괄적으로 대응할 수 있음)
// [[...id]] -> Optional Catch All Segments (대괄호로 한번 더 감싸면 index.tsx의 역할도 할 수 있음)

// export const getServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   const id = context.params?.id ?? "";

//   const book = await fetchOneBook(Number(id));

//   return {
//     props: { book },
//   };
// };
export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    /**
     * Fallback 옵션 설정 (없는 경로로 요청 시)
     * false: 404 Not Found 반환
     * blocking: 즉시 생성 (Like SSR)
     * true: 즉시 생성 + 페이지만 미리 변환
     *  - props가 없는 페이지를 먼저 반환하고 props를 게산한 후 후속으로 props만 따로 반환
     */
    fallback: true,
  };
};

// SSG 방식
export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params?.id ?? "";

  const book = await fetchOneBook(Number(id));

  if (!book)
    return {
      notFound: true,
    };

  return {
    props: { book },
  };
};

const Page = ({ book }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  if (router.isFallback) return "로딩 중 입니다.";

  if (!book) return "문제가 발생했습니다. 다시 시도하세요.";

  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    book;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} alt="커버 이미지" />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>

      <div className={style.description}>{description}</div>
    </div>
  );
};

export default Page;
