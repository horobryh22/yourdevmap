export type UserId = string;
export type Role = "ADMIN" | "USER";

export const ROLES: Record<Role, Role> = {
  ADMIN: "ADMIN",
  USER: "USER",
};

// определяем кастомные типы, которы расширяют текущи типы auth-next
export type UserEntity = {
  id: UserId;
  email: string;
  emailVerified?: Date | null;
  role: Role;
  name?: string | null;
  image?: string | null;
};

export type SessionEntity = {
  user: {
    id: UserId;
    email: string;
    role: Role;
    name?: string | null;
    image?: string | null;
  };
  expires: string;
};

// проекции
export type Profile = {
  email: string;
  name?: string | null;
  image?: string | null;
};
