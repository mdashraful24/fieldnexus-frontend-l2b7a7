import { CircleUser } from "lucide-react";
import type { Metadata } from "next";
import ProfileOverview from "@/components/modules/profile/profile-overview";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "My Profile",
  description:
    "Review your account details, role, status, and the information linked to your profile.",
  path: "/profile",
  noIndex: true,
});

export default function ProfilePage() {
  return (
    <div className="flex-1 p-4 lg:p-6">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <div className="flex items-center gap-3">
          <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <CircleUser className="size-5" />
          </span>
          <div>
            <h1 className="font-heading text-2xl font-semibold tracking-tight">
              My Profile
            </h1>
            <p className="text-sm text-muted-foreground">
              Review the details linked to your account.
            </p>
          </div>
        </div>

        <ProfileOverview />
      </div>
    </div>
  );
}
