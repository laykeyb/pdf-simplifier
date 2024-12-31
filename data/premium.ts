"use server";
import { db } from "@/lib/db";

export async function checkPremiumStatus(userId: string) {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { isPremium: true, premiumUntil: true, role: true },
  });

  if (!user) return false;
  if (user.role === "ADMIN") {
    await db.user.update({
      where: { id: userId },
      data: { isPremium: true, premiumUntil: null },
    });
    return user.isPremium;
  }

    if (user.premiumUntil && user.premiumUntil < new Date()) {
      // Premium expired
      await db.user.update({
        where: { id: userId },
        data: { isPremium: false, premiumUntil: null },
      });
      return false;
    }


  return user.isPremium;
}
