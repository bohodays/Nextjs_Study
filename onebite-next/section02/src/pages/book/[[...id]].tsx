import { useRouter } from "next/router";

// [...id] -> Catch All Segments (중첩된 URL 경로도 포괄적으로 대응할 수 있음)
// [[...id]] -> Optional Catch All Segments (대괄호로 한번 더 감싸면 index.tsx의 역할도 할 수 있음)
const Page = () => {
  const router = useRouter();
  const { id } = router.query;

  return <h1>Book {id}</h1>;
};

export default Page;
