import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Profile } from "../_domain/types";
import { cn } from "@/shared/ui/utils";
import { getProfileLetters } from "../_vm/get-profile-letters";

export const ProfileAvatar = ({
  profile,
  className,
  dataTestId = "profile_header_avatar",
}: {
  profile?: Profile;
  className?: string;
  dataTestId?: string;
}) => {
  if (!profile) {
    return null;
  }

  return (
    <Avatar data-testid={dataTestId} className={cn(className)}>
      <AvatarImage src={profile.image ?? ""} className={"object-cover"} />
      <AvatarFallback>{getProfileLetters(profile)}</AvatarFallback>
    </Avatar>
  );
};
