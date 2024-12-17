import { dbClient } from "@/shared/lib/db";
import type { Profile, UserId } from "../_domain/types";

export class ProfileRepository {
  async update(userId: UserId, data: Partial<Profile>): Promise<Profile> {
    return dbClient.user.update({ where: { id: userId }, data });
  }
}

export const profileRepository = new ProfileRepository();
