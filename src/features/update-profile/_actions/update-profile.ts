"use server";

import { z } from "zod";
import { getAppSessionStrictServer } from "@/entities/user/session.server";
import { updateProfileUseCase } from "@/entities/user/profile.server";
import { Profile } from "@/entities/user/_domain/types";
import { profileSchema } from "@/entities/user/profile";

const propsSchema = z.object({
  userId: z.string(),
  data: profileSchema.partial(),
});

const resultSchema = z.object({
  profile: profileSchema,
});

export const updateProfileAction = async (
  props: z.infer<typeof propsSchema>,
) => {
  // валидируем входные параметры
  const { userId, data } = propsSchema.parse(props);

  const session = await getAppSessionStrictServer();

  const profile = (await updateProfileUseCase.exec({
    id: userId,
    session,
    data,
  })) as Profile;

  return resultSchema.parseAsync({
    profile,
  });
};
