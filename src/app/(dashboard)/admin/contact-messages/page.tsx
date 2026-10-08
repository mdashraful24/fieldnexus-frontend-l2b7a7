import { Mail } from "lucide-react";
import type { Metadata } from "next";
import AdminContactMessages from "@/components/modules/admin/admin-contact-messages";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Contact Messages",
  description:
    "Read messages submitted from the public contact form, including who sent them and when.",
  path: "/admin/contact-messages",
  noIndex: true,
});

export default function AdminContactMessagesPage() {
  return (
    <div className="flex-1 p-4 lg:p-6">
      <div className="mx-auto flex w-full flex-col gap-6">
        <div className="flex items-center gap-3">
          <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Mail className="size-5" />
          </span>
          <div>
            <h1 className="font-heading text-2xl font-semibold tracking-tight">
              Contact Messages
            </h1>
            <p className="text-sm text-muted-foreground">
              Messages submitted from the public contact form.
            </p>
          </div>
        </div>

        <AdminContactMessages />
      </div>
    </div>
  );
}
