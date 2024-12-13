import type { UserId } from "@/entities/user/_domain/types";
import { getUserProfileAction } from "@/entities/user/_actions/get-user-profile";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

// все ключи инкапсулированы здесь

const BASE_KEY = "user";

export const getProfileQuery = (userId: UserId) => ({
  queryFn: () => getUserProfileAction({ userId }),
  queryKey: [BASE_KEY, "getProfileById", userId],
});

export const useInvalidateProfile = () => {
  const client = useQueryClient();

  return useCallback(
    async (userId: UserId) => {
      await client.invalidateQueries({
        queryKey: [BASE_KEY, "getProfileById", userId],
      });
    },
    [client],
  );
};
