import { ROLES, SessionEntity, UserId } from "@/entities/user/_domain/types";

export const createUserAbility = (session: SessionEntity) => ({
  canGetUser: (userId: UserId) =>
    session.user.id === userId || session.user.role === ROLES.ADMIN,
});
