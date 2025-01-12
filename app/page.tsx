import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import { LogIn } from "lucide-react";
const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <nav className="flex justify-between py-4">
        <h1
          className={cn(
            "text-lg font-bold text-white lg:text-3xl",
            font.className,
          )}
        >
          Meaningfier
        </h1>
        <LoginButton asChild>
          <Button variant="purple" size="lg" className="rounded-2xl text-white">
            Get started
          </Button>
        </LoginButton>
      </nav>
      <main className="">
        <div className="space-y-6 text-center">
          {/* <h1
            className={cn(
              "text-xl font-semibold text-white drop-shadow-md lg:text-6xl",
              font.className,
            )}
          >
            Meaningfier
          </h1> */}
          <h1 className="mt-10 text-xl font-semibold text-white drop-shadow-md lg:text-4xl">
            A pdf simplification tool
          </h1>
          <p className="text-[#D3FE3E]">
            Meaningfier replace difficult words in your documents with their
            meanings.
          </p>
          <div>
            <LoginButton asChild>
              <Button
                variant="purple"
                size="lg"
                className="rounded-2xl text-white outline outline-2 outline-red-500"
              >
                Get started
              </Button>
            </LoginButton>
          </div>
        </div>
        <section className="mt-8">
          <h2 className="mt-20 max-w-xl text-xl font-semibold text-white drop-shadow-md lg:text-4xl">
            Focus on reading and understanding
          </h2>
          <p className="text-[#D3FE3E]">
            Never waste time getting mening of words from dictionaries{" "}
          </p>
          <h2 className="mt-20 max-w-xl text-xl font-semibold text-white drop-shadow-md lg:text-4xl">
            No more inadequate meaning
          </h2>
          <p className="text-[#D3FE3E]">
            Intelligently meaningfies word with the right meaning to fix the
            context{" "}
          </p>
        </section>
        <section className="mt-8">
          <h2 className="mt-20 text-xl font-semibold text-white drop-shadow-md lg:text-4xl">
            Use AI
          </h2>
          <p className="text-[#D3FE3E]">
           Reword words to simpler synonyms with the power of ai
          </p>
        </section>
      </main>
    </div>
  );
}
