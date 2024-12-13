import type { Profile, SessionEntity, UserId } from "../_domain/types";
import { createProfileAbility } from "@/entities/user/_domain/ability";
import { AccessError } from "@/shared/lib/errors";
import { profileRepository } from "@/entities/user/_repositories/profile";

type UpdateProfile = {
  id: UserId;
  data: Partial<Profile>;
  session: SessionEntity;
};

export class UpdateProfileUseCase {
  async exec({ id, data, session }: UpdateProfile): Promise<Profile> {
    const profileAbility = createProfileAbility(session);

    // проверяем доступы
    if (!profileAbility.canUpdateProfile(id)) {
      throw new AccessError();
    }

    return await profileRepository.update(id, data);
  }
}

export const updateProfileUseCase = new UpdateProfileUseCase();
