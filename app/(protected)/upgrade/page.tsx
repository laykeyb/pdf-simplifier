"use client";
import { makeUserPremium } from "@/actions/premium";
import { useCurrentUser } from "@/hooks/use-current-user";

import { PaystackButton } from "react-paystack";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function page() {
  const user = useCurrentUser();
  
  const componentProps = {
    email: user?.email,
    amount: 5000 * 100,
    metadata: {
      name: user?.name,
    },
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
    text: "Subscribe",
    onSuccess: async () => {
      await makeUserPremium(user?.id);
      alert("Thanks for subscribing");
    },
    onClose: () => alert("Are you sure you want to close?"),
  };
  return (
    <div className="container mx-auto">
      <h1 className="lg:text-4xl text-xl mx-auto text-center mb-8">Choose your plan</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <Card className="md:w-1/3 w-full bg-purple-400 shadow border">
          <CardHeader>
            <h2 className="font-bold text-lg lg:text-2xl">Pro</h2>
            <h2><span className="font-bold text-lg lg:text-2xl">₦5000</span> / month</h2>
          </CardHeader>
          <CardContent>
        
            <ul className="prose">
              <li>Use ai which intelligently rewords the word to fit the context
              perfectly</li>
              <li>No ads</li>
            </ul>
        
          </CardContent>
          <CardFooter>
            <PaystackButton
              {...componentProps}
              className="rounded bg-blue-600 px-4 py-2 text-white shadow"
            />
          </CardFooter>
        </Card>
        <Card className="md:w-1/3 w-full bg-purple-400 shadow border">
          <CardHeader>
            <h2 className="font-bold text-lg lg:text-2xl">Pro</h2>
            <h2><span className="font-bold text-lg lg:text-2xl">₦50000</span> / Year</h2>
          </CardHeader>
          <CardContent>
        
            <ul className="prose">
              <li>Save ₦10000</li>
              <li>Use ai which intelligently rewords the word to fit the context
              perfectly</li>
              <li>No ads</li>
            </ul>
        
          </CardContent>
          <CardFooter>
            <PaystackButton
              {...componentProps} amount={50000*100}
              className="rounded bg-blue-600 px-4 py-2 text-white shadow"
            />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
