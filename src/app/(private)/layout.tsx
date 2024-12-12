import { AppHeader } from "@/widgets/app-header/app-header";
import AuthorizedGuard from "@/features/auth/authorized-guard";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppHeader variant={"private"} />
      <AuthorizedGuard>
        <div className="container mx-auto flex justify-center">{children}</div>
      </AuthorizedGuard>
    </>
  );
}
