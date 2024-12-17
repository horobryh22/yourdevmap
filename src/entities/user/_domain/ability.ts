import type { SessionEntity, UserId } from "@/entities/user/_domain/types";
import { ROLES } from "@/entities/user/_domain/types";

export const createUserAbility = (session: SessionEntity) => ({
  canGetUser: (userId: UserId) =>
    session.user.id === userId || session.user.role === ROLES.ADMIN,
});

export const createProfileAbility = (session: SessionEntity) => ({
  canUpdateProfile: (userId: UserId) =>
    session.user.id === userId || session.user.role === ROLES.ADMIN,
});
