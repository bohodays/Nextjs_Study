import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode } from "react";
import BookItem from "@/components/book-item";
import { InferGetStaticPropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";
import Head from "next/head";

// NextJs는 페이지마다 meta태그를 별도로 설정할 수 있음

// 순서
// 1. 해당 url로 요청이 들어옴
// 2. getServerSideProps 함수 실행 (api 요청 등 수행)
// 3. Home 컴포넌트 실행

// getServerSideProps 함수를 만들어주면 해당 페이지는 자동으로 SSR로 설정됨
// getServerSideProps 함수 안에 console.log("서버사이드로 실행")을 작성하면 해당 console은 서버에서 실행되기 때문에 브라우저에서 출력되지 않음
// 페이지 컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터를 불러오는 함수
// export const getServerSideProps = async () => {
//   const [allBooks, recoBooks] = await Promise.all([
//     fetchBooks(),
//     fetchRandomBooks(),
//   ]);

//   return {
//     props: {
//       allBooks,
//       recoBooks,
//     },
//   };
// };

// SSG 방식
export const getStaticProps = async () => {
  const [allBooks, recoBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ]);

  return {
    props: {
      allBooks,
      recoBooks,
    },
    // ISR 방식을 위해 revalidate 적용
    // revalidate: 3,
  };
};

// Home 컴포넌트는 서버 사이드 렌더링 과정에서 서버에서 한번 실행되고, hydration 과정에서 브라우저에서 한번 실행되어서 총 2번 실행됨
export default function Home({
  allBooks,
  recoBooks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>한입북스</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입북스" />
        <meta
          property="og:description"
          content="한입 북스에 등록된 도서들을 만나보세요"
        />
      </Head>
      <div className={style.container}>
        <section>
          <h3>지금 추천하는 도서</h3>
          {recoBooks.map((book) => (
            <BookItem key={book.id} {...book} />
          ))}
        </section>
        <section>
          <h3>등록된 모든 도서</h3>
          {allBooks.map((book) => (
            <BookItem key={book.id} {...book} />
          ))}
        </section>
      </div>
    </>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
