import {Poppins} from "next/font/google"
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
const font = Poppins({
  subsets:["latin"],
  weight:["600"]
})

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-purple-500">
      <div className="space-y-6 text-center">
        <h1 className={cn("text-6xl font-semibold text-white drop-shadow-md",font.className)}>
          Meaningfier
        </h1>
        <p className="text-white text-lg">A pdf simplification tool</p>
        <div>
          <LoginButton  asChild>
            <Button variant="secondary" size="lg">Sign in</Button>
          </LoginButton>
          
        </div>
      </div>
    </main>
  );
}
