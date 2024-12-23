"use client";

import { useQuery } from "@tanstack/react-query";
import { ProfileForm } from "./_ui/profile-form";
import { getProfileQuery } from "@/entities/user/profile";
import { Spinner } from "@/shared/ui/spinner";
import { UserId } from "@/entities/user/_domain/types";
import { useRouter } from "next/navigation";

export function UpdateProfileForm({
  userId,
  callbackUrl,
}: {
  userId: UserId;
  callbackUrl?: string;
}) {
  const profileQuery = useQuery({
    ...getProfileQuery(userId),
    retry: 0,
  });

  const router = useRouter();

  const handleSuccess = () => {
    if (!callbackUrl) return;

    router.push(callbackUrl);
  };

  if (profileQuery.isPending) {
    return <Spinner data-testid="user_profile_loader" />;
  }

  if (!profileQuery.data?.profile) {
    return (
      <div data-testid={"profile_access_denied"}>
        Не удалось загрузить профиль, возможно у вас нет прав
      </div>
    );
  }

  return (
    <ProfileForm
      userId={userId}
      profile={profileQuery.data?.profile}
      onSuccess={handleSuccess}
      submitText={callbackUrl ? "Продолжить" : "Сохранить"}
    />
  );
}
