"use server";

import { z } from "zod";
import { getUserUseCase } from "@/entities/user/_use-cases/get-user";
import { getAppSessionStrictServer } from "@/entities/user/session.server";

const propsSchema = z.object({
  userId: z.string(),
});

const profileSchema = z.object({
  email: z.string(),
  name: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
});

const resultSchema = z.object({
  profile: profileSchema,
});

// здесь с помощью zod вырезаем лишние поля из объекта из базы
// так как из базы забираем пользователя целиком (UserEntity)

export const getUserProfileAction = async (
  props: z.infer<typeof propsSchema>,
) => {
  // валидируем входные параметры
  const { userId } = propsSchema.parse(props);

  const session = await getAppSessionStrictServer();

  const user = await getUserUseCase.exec({
    id: userId,
    session,
  });

  // выкидываем лишнее из объекта
  return resultSchema.parseAsync({
    profile: user,
  });
};
