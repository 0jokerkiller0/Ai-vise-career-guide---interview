import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { industries } from "@/data/industries";
import OnboardingForm from "../onboarding/_components/onboarding-form";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) redirect("/onboarding");

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>
        <OnboardingForm industries={industries} initialData={user} />
      </div>
    </div>
  );
}
