import type { UserId } from "@/entities/user/_domain/types";
import { getUserProfileAction } from "@/entities/user/_actions/get-user-profile";

const baseKey = "user";

export const getProfileQuery = (userId: UserId) => ({
  queryFn: () => getUserProfileAction({ userId }),
  queryKey: [baseKey, "getProfileById", userId],
});
