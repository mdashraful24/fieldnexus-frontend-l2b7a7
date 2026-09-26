import { CircleUser } from "lucide-react";
import ProfileForm from "@/components/modules/profile/profile-form";

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
              Update your photo and the details linked to your account.
            </p>
          </div>
        </div>

        <ProfileForm />
      </div>
    </div>
  );
}
