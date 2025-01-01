/**
 * v0 by Vercel.
 * @see https://v0.dev/t/lJwnQlHSEBA
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import Link from "next/link";
import { UserButton } from "./auth/user-button";
const NAVBARITEMS: { label: string; href: string }[] = [
  {
    label: "Home",
    href: "/simplify",
  },
  {
    label: "Contact",
    href: "/contact",
  },
  {
    label: "History",
    href: "/history",
  },
];
export default function Navbar() {
  return (
    <header className="flex container mx-auto  bg-purple-400 h-20 w-full shrink-0 items-center px-4 md:px-6">
      <div className="lg:hidden"><UserButton/></div>
      <Link href="/" className="max-lg:mx-auto " prefetch={false}>
      <h1 className="lg:text-3xl text-lg font-bold ">Meaningfier</h1>
        <span className="sr-only">Acme Inc</span>
      </Link>
      <Sheet>
        <SheetTrigger asChild>
            <div className="lg:hidden">
              <MenuIcon className="size-8 cursor-pointer" />
              <span className="sr-only">Toggle navigation menu</span>
            </div>
        
        </SheetTrigger>
        <SheetContent side="right" className="bg-purple-400">
          <Link href="#" className="mr-6 hidden lg:flex" prefetch={false}>
            
            <span className="sr-only">Acme Inc</span>
          </Link>
          <div className="grid gap-2 py-6">
            {NAVBARITEMS.map(({ label, href }) => (
              <Link
                href={href}
                key={href}
                className="flex w-full items-center py-2 text-lg font-semibold"
                prefetch={false}
              >
                {label}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
      
      <nav className="ml-auto hidden lg:flex gap-6">
        {NAVBARITEMS.map(({ label, href }) => (
          <Link
            href={href}
            key={href}
            className="group inline-flex h-9 w-max items-center justify-center rounded-md  px-4 py-2 text-lg font-medium transition-colors hover:underline 0 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
            prefetch={false}
          >
            {label}
          </Link>
        ))}
        <UserButton/>
      </nav>
    </header>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

