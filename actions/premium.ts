"use server";

import { checkPremiumStatus } from "@/data/premium";
import { db } from "@/lib/db";

//TODO: use function to pass user as parameter from useeffect of use-ai-switch
export const checkUserPremium = async (userId: string | undefined) => {
  if (!userId) return false;
  return await checkPremiumStatus(userId);
};

export const makeUserPremium = async (userId: string | undefined) => {
  const premium = await checkUserPremium(userId);
  if (userId) {
    if (!premium) {
      await db.user.update({
        where: {
          id: userId,
        },
        data: {
          isPremium: true,
          premiumUntil: new Date(new Date().getTime() + 30 * 24 * 3600 * 1000),
        },
      });
    }
  }
};
