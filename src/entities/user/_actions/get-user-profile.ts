"use server";

import { z } from "zod";
import { getUserUseCase } from "@/entities/user/_use-cases/get-user";
import { getAppSessionStrictServer } from "@/entities/user/session.server";
import { profileSchema } from "@/entities/user/_domain/schema";

const propsSchema = z.object({
  userId: z.string(),
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
