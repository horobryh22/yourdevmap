"use server";

import { z } from "zod";
import { AVATAR_FILE_KEY } from "@/features/update-profile/_constants";
import { BadRequestError } from "@/shared/lib/errors";
import { fileStorage } from "@/shared/lib/file-storage";

const resultSchema = z.object({
  avatar: z.object({
    path: z.string(),
  }),
});

export const uploadAvatarAction = async (formData: FormData) => {
  const file = formData.get(AVATAR_FILE_KEY);

  if (!(file instanceof File)) {
    throw new BadRequestError();
  }

  const storedFile = await fileStorage.uploadImage(file, "avatar");

  return resultSchema.parse({
    avatar: storedFile,
  });
};
