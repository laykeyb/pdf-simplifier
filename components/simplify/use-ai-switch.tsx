import { useAiAtom } from "@/atoms/simplify-atoms";
import { useCurrentUser } from "@/hooks/use-current-user";

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useAtom } from "jotai";
import { checkUserPremium } from "@/actions/premium";
import { useEffect, useState } from "react";

import Link from "next/link";
export function UseAiSwitch({ simplify }: { simplify: boolean }) {
  const [useAi, setUseAi] = useAtom(useAiAtom);
  const  user = useCurrentUser()
  const [isPremium, setIsPremium] = useState(false)
  
  useEffect(() => {
    const checkPremium = async () => {
        const premium = await checkUserPremium(user?.id);
        setIsPremium(premium);
    };
    
    checkPremium();
}, [user?.id]);

  return (
    <div>
      <Label htmlFor="useAi" >Use AI</Label>
      <Switch
        checked={useAi}
        disabled={simplify || !isPremium}
        onCheckedChange={setUseAi}
        id="useAi"
        className="mx-2"
      />
      {!isPremium &&  <Button asChild><Link href="/simplify/upgrade">Subscribe</Link></Button>}
    </div>
  );
}
