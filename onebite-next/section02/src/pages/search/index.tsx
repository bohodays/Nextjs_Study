import SearchableLayout from "@/components/searchable-layout";
import { useRouter } from "next/router";
import { ReactNode } from "react";

const Page = () => {
  const router = useRouter();
  const { q } = router.query;

  return <h1>search {q}</h1>;
};

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};

export default Page;
