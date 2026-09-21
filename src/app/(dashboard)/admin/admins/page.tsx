import { UserCog } from "lucide-react";
import SuperAdminAdminsTabs from "@/components/modules/super-admin/super-admin-admins-tabs";

export default function AdminAdminsPage() {
  return (
    <div className="flex-1 p-4 lg:p-6">
      <div className="mx-auto flex w-full flex-col gap-6">
        <div className="flex items-center gap-3">
          <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <UserCog className="size-5" />
          </span>
          <div>
            <h1 className="font-heading text-2xl font-semibold tracking-tight">
              Admins
            </h1>
            <p className="text-sm text-muted-foreground">
              Create and manage admins — block, unblock, delete, restore, reset
              passwords, or change emails.
            </p>
          </div>
        </div>

        <SuperAdminAdminsTabs />
      </div>
    </div>
  );
}