import type { SessionEntity, UserEntity, UserId } from "../_domain/types";
import { userRepository } from "../_repositories/user.repository";
import { createUserAbility } from "@/entities/user/_domain/user-ability";
import { AuthorizationError } from "@/shared/lib/errors";

type GetUser = {
  id: UserId;
  session: SessionEntity;
};

export class GetUserUseCase {
  async exec({ id, session }: GetUser): Promise<UserEntity> {
    const userAbility = createUserAbility(session);

    // проверяем доступы
    if (!userAbility.canGetUser(id)) {
      throw new AuthorizationError();
    }

    return await userRepository.getUserById(id);
  }
}

export const getUserUseCase = new GetUserUseCase();
