import Searchbar from "./searchbar";

export default function Layout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <div>
      <Searchbar />
      {children}
    </div>
  );
}
