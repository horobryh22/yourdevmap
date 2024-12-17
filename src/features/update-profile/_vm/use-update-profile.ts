import { useMutation } from "@tanstack/react-query";
import { updateProfileAction } from "../_actions/update-profile";
import { useInvalidateProfile } from "@/entities/user/_queries";
import { useAppSession } from "@/entities/user/session";

export const useUpdateProfile = () => {
  const invalidateProfile = useInvalidateProfile();
  const { data, update } = useAppSession();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateProfileAction,
    onSuccess: async ({ profile }, { userId }) => {
      await invalidateProfile(userId);
      await update({ ...data, user: { ...data?.user, ...profile } });
    },
  });

  return { update: mutateAsync, isPending };
};
