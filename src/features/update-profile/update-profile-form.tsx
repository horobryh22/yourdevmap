"use client";
import { useQuery } from "@tanstack/react-query";
import { ProfileForm } from "./_ui/profile-form";
//import { getProfileQuery } from "@/entities/profile/queries";
import { useRouter } from "next/navigation";
import { getProfileQuery } from "@/entities/user/profile";
import { Spinner } from "@/shared/ui/spinner";

export function UpdateProfileForm({
  userId,
  callbackUrl,
}: {
  userId: string;
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
      profile={profileQuery.data?.profile}
      onSuccess={() => {}}
      submitText={callbackUrl ? "Продолжить" : "Сохранить"}
    />
  );
}
