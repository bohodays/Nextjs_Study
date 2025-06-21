import SearchableLayout from "@/components/searchable-layout";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import BookItem from "@/components/book-item";
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from "next";
import fetchBooks from "@/lib/fetch-books";

// export const getServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   const q = context.query.q;

//   const books = await fetchBooks(q as string);

//   return {
//     props: { books },
//   };
// };

// SSG 방식
export const getStaticProps = async (context: GetServerSidePropsContext) => {
  const q = context.query.q;

  const books = await fetchBooks(q as string);

  return {
    props: { books },
  };
};

const Page = ({ books }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
};

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};

export default Page;
