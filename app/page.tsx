import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import { LogIn } from "lucide-react";
import Image from "next/image";
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
            "text-lg font-bold text-black lg:text-3xl",
            font.className,
          )}
        >
          Meaningfier
        </h1>
        <LoginButton asChild>
          <Button variant="purple" size="lg" className="rounded-2xl text-black">
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
          <h1 className="mt-10 text-xl font-semibold text-black drop-shadow-md lg:text-4xl">
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
                className="rounded-2xl text-black outline outline-2 outline-red-500"
              >
                Get started
              </Button>
            </LoginButton>
          </div>
        </div>
        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill=" #a855f7" fill-opacity="1" d="M0,224L0,96L288,96L288,192L576,192L576,96L864,96L864,160L1152,160L1152,32L1440,32L1440,320L1152,320L1152,320L864,320L864,320L576,320L576,320L288,320L288,320L0,320L0,320Z"></path></svg> */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill=" #a855f7"
            fill-opacity="1"
            d="M0,64L48,80C96,96,192,128,288,117.3C384,107,480,53,576,53.3C672,53,768,107,864,128C960,149,1056,139,1152,117.3C1248,96,1344,64,1392,48L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill=" #a855f7"
            fill-opacity="1"
            d="M0,64L48,80C96,96,192,128,288,117.3C384,107,480,53,576,53.3C672,53,768,107,864,128C960,149,1056,139,1152,117.3C1248,96,1344,64,1392,48L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
        <section className="mt-8">
          <div className="flex items-center justify-center">
            <div className="md:w-1/2 w-full" >
              <h2 className="mt-20 max-w-xl text-xl font-semibold text-black drop-shadow-md lg:text-4xl">
                Focus on reading and understanding
              </h2>
              <p className="text-[#D3FE3E]">
                Never waste time getting meaning of words from dictionaries{" "}
              </p>
            </div>
            <div className="md:w-1/2 w-full max-h-40">
              <img src="/undraw_in-the-zone_07y7.png" alt="" />
            </div>
          </div>
          <h2 className="mt-20 max-w-xl text-xl font-semibold text-black drop-shadow-md lg:text-4xl">
            No more inadequate meaning
          </h2>
          <p className="text-[#D3FE3E]">
            Intelligently meaningfies word with the right meaning to fix the
            context{" "}
          </p>
        </section>
        <section className="mt-8">
          <h2 className="mt-20 text-xl font-semibold text-black drop-shadow-md lg:text-4xl">
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
