
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { cn } from "@/lib/utils";

import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meaningfier PDF simplifier",
  description: "A PDF simplification tool",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={cn(inter.className, "bg-purple-400")}>
      
            <main>{children}</main>
            <Toaster />
         <GoogleAnalytics gaId="G-T3WMZHPJ6S"/>
        </body>
      </html>
    </SessionProvider>
  );
}
