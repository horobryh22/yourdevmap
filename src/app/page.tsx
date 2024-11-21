import { Button } from "@/shared/ui/button";
import {PrismaClient} from "@prisma/client"

const client = new PrismaClient();

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button>Button</Button>
    </main>
  );
}
