import { Layout } from "./_ui/layout";
import { Logo } from "./_ui/logo";
import { MainNav } from "./_ui/main-nav";
import { Profile } from "./_ui/profile";
import { ToggleTheme } from "@/features/app-theme/toggle-theme";

type AppHeaderPropsT = {
  variant: "private" | "public" | "auth";
};

export function AppHeader({ variant }: AppHeaderPropsT) {
  const withProfile = variant !== "auth";

  return (
    <Layout
      logo={<Logo />}
      nav={<MainNav />}
      profile={withProfile && <Profile />}
      actions={<ToggleTheme />}
    />
  );
}
