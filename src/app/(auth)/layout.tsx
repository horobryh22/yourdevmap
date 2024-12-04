import { AppHeader } from "@/widgets/app-header/app-header";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppHeader variant={"auth"} />
      <div className="container mx-auto flex justify-center">{children}</div>
    </>
  );
}
