"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { useAppSession } from "@/entities/user/session";
import { useSignOut } from "@/features/auth/use-sign-out";
import { SignInButton } from "@/features/auth/sign-in-button";
import { Skeleton } from "@/shared/ui/skeleton";
import { getProfileDisplayName, ProfileAvatar } from "@/entities/user/profile";

export function Profile() {
  const session = useAppSession();
  const { signOut, isLoadingSignOut } = useSignOut();

  if (session.status === "loading") {
    return <Skeleton className="w-8 h-8 rounded-full" />;
  }

  if (session.status === "unauthenticated") {
    return <SignInButton />;
  }

  const user = session.data?.user;

  return (
    <DropdownMenu data-testid={"avatar_menu"}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="p-px rounded-full self-center h-8 w-8"
        >
          <ProfileAvatar profile={user} className="w-8 h-8" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-2 ">
        <DropdownMenuLabel>
          <p>Мой профиль</p>
          <p
            className="text-xs text-muted-foreground overflow-hidden text-ellipsis"
            data-testid={"profile_display_name"}
          >
            {user ? getProfileDisplayName(user) : undefined}
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild data-testid={"go_to_profile_link"}>
            <Link href={`/profile/${user?.id}`}>
              <User className="mr-2 h-4 w-4" />
              <span>Профиль</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={isLoadingSignOut}
            onClick={() => signOut()}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Выход</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
