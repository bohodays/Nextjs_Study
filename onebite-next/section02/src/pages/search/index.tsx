import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter();
  const { q } = router.query;

  return <h1>search {q}</h1>;
};

export default Page;
