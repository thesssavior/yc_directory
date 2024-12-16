import Link from "next/link";
import Image from "next/image";
import { auth, signOut, signIn } from "@/auth";
import { BadgePlus, LogIn, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-5 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <div className="flex flex-row">
            <div>
              <Link href="/">
                <Image src="/logo.png" alt="logo" width={60} height={40} />
              </Link>
            </div>

            <div className="flex items-center justify-between gap-6 ml-4">
              <Link href="/community" className="flex items-center gap-2">
                <span className="max-sm:hidden">Community</span>
              </Link>
              <Link href="/faq" className="flex items-center gap-2">
                <span className="max-sm:hidden">FAQ</span>
              </Link>
              <Link href="/about" className="flex items-center gap-2">
                <span className="max-sm:hidden">About</span>
              </Link>
          </div>
        </div>


        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Button className="flex items-center text-white bg-primary hover:bg-secondary text-base focus:ring-2 rounded-lg me-2 focus:outline-none">
                <Link href="/startup/create" className="flex items-center gap-2">
                  <span className="max-sm:hidden">Create Lesson</span>
                  <BadgePlus className="size-6" />
                </Link>
              </Button>
              <form
                action={async () => {
                  "use server";

                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit" className="flex gap-2 text-red-500">
                  <span className="max-sm:hidden">Logout</span>
                  <LogOut className="size-6 max-sm:hidden" />
                </button>
              </form>

              <Link href={`/user/${session?.id}`}>
                <Avatar className="size-10">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || ""}
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";

                await signIn("github");
              }}
            >

              <Button className="flex gap-2 items-center text-white bg-primary hover:bg-secondary focus:ring-2 rounded-lg me-2 focus:outline-none">
              <span className="max-sm:hidden text-base">Login</span>
                <LogIn className="size-6 max-sm:hidden" />
              </Button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
