import { useMutation } from "@tanstack/react-query";
import { selectFile, validateFileSize } from "@/shared/lib/file";
import {
  AVATAR_FILE_KEY,
  MAX_AVATAR_FILE_SIZE,
} from "@/features/update-profile/_constants";
import { uploadAvatarAction } from "@/features/update-profile/_actions/upload-avatar";

export const useUploadAvatar = ({
  onError,
  onSuccess,
}: {
  onSuccess?: (avatarPath: string) => void;
  onError?: (type: string) => void;
}) => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: uploadAvatarAction,
    onSuccess: (data) => {
      onSuccess?.(data.avatar.path);
    },
  });

  const handleFileSelect = async () => {
    const file = await selectFile("image/**");

    if (validateFileSize(file, MAX_AVATAR_FILE_SIZE)) {
      onError?.("invalid size");
    }

    const formData = new FormData();

    formData.set(AVATAR_FILE_KEY, file);

    await mutateAsync(formData);
  };

  return {
    isPending,
    upload: handleFileSelect,
  };
};
