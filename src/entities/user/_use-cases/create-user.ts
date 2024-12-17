import { ROLES, UserEntity } from "../_domain/types";
import { createId } from "@/shared/lib/id";
import { userRepository } from "../_repositories/user";
import { privateConfig } from "@/shared/config/private";

// тип, с которым работает текущий next-auth адаптер при создании
type CreateUser = Omit<UserEntity, "id" | "role">;

export class CreateUserUseCase {
  // расширяем дефолтного юзера из next-auth
  async exec(data: CreateUser) {
    const adminEmails = privateConfig.ADMIN_EMAILS?.split(",") ?? [];
    const role = adminEmails.includes(data.email) ? ROLES.ADMIN : ROLES.USER;

    const user: UserEntity = {
      id: createId(),
      role,
      ...data,
    };

    return await userRepository.createUser(user);
  }
}

export const createUserUseCase = new CreateUserUseCase();
