"use client";

import { useQuery } from "@tanstack/react-query";
import { ProfileForm } from "./_ui/profile-form";
import { getProfileQuery } from "@/entities/user/profile";
import { Spinner } from "@/shared/ui/spinner";
import { UserId } from "@/entities/user/_domain/types";

export function UpdateProfileForm({
  userId,
  callbackUrl,
}: {
  userId: UserId;
  callbackUrl?: string;
}) {
  const profileQuery = useQuery({
    ...getProfileQuery(userId),
  });
  /*
   const router = useRouter();

   const handleSuccess = () => {
     if (callbackUrl) {
       router.push(callbackUrl);
     }
   };*/

  if (profileQuery.isPending) {
    return <Spinner data-testid="Загрузка профиля" />;
  }

  if (!profileQuery.data?.profile) {
    return <div>Не удалось загрузить профиль, возможно у вас нет прав</div>;
  }

  return (
    <ProfileForm
      userId={userId}
      profile={profileQuery.data?.profile}
      onSuccess={() => {}}
      submitText={callbackUrl ? "Продолжить" : "Сохранить"}
    />
  );
}
