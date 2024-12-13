import type { SessionEntity, UserEntity, UserId } from "../_domain/types";
import { userRepository } from "../_repositories/user";
import { createUserAbility } from "@/entities/user/_domain/ability";
import { AccessError } from "@/shared/lib/errors";

type GetUser = {
  id: UserId;
  session: SessionEntity;
};

export class GetUserUseCase {
  async exec({ id, session }: GetUser): Promise<UserEntity> {
    const userAbility = createUserAbility(session);

    // проверяем доступы
    if (!userAbility.canGetUser(id)) {
      throw new AccessError();
    }

    return await userRepository.getUserById(id);
  }
}

export const getUserUseCase = new GetUserUseCase();
