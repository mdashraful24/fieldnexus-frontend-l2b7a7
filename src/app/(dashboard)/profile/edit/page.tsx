import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import ProfileForm from "@/components/modules/profile/profile-form";
import { Button } from "@/components/ui/button";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Edit Profile",
  description:
    "Update your photo, name, and the details linked to your Field Nexus account.",
  path: "/profile/edit",
  noIndex: true,
});

export default function EditProfilePage() {
  return (
    <div className="flex-1 p-4 lg:p-6">
      <div className="mx-auto flex w-full flex-col gap-6">
        <Button
          variant="ghost"
          size="sm"
          nativeButton={false}
          render={<Link href="/profile" />}
          className="-ml-2 w-fit"
        >
          <ArrowLeft size="16" />
          Back to My Profile
        </Button>

        <div>
          <h1 className="font-heading text-2xl font-semibold tracking-tight">
            Edit Profile
          </h1>
          <p className="text-sm text-muted-foreground">
            Update your photo and the details linked to your account.
          </p>
        </div>

        <ProfileForm />
      </div>
    </div>
  );
}
