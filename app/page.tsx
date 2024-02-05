import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex flex-col content-center m-6">
      <h1 className="text-2xl font-bold">Slack App Playground</h1>
      <Link
        href="/block-kit"
        className={`${buttonVariants({ variant: "outline" })} mt-6`}
      >
        Block Kit Examples
      </Link>
    </main>
  );
}
