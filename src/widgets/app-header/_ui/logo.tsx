import { AppIcon } from "@/shared/ui/icon";
import Link from "next/link";

export function Logo() {
  return (
    <Link className="flex items-center space-x-2" href="/">
      <AppIcon className="h-6 w-6" />
      <span className="font-bold inline-block">YourDevMap</span>
    </Link>
  );
}
