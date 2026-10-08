"use client";

import { Eye, Inbox, Mail, MailOpen } from "lucide-react";
import { type Dispatch, type SetStateAction, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TablePagination from "@/components/ui/table-pagination";
import { toast } from "@/components/ui/toast";
import {
  useMarkContactMessageRead,
  useSuspenseGetContactMessages,
} from "@/hooks";
import { getApiErrorMessage } from "@/lib/apiError";
import type { IContactMessage, IContactMessageParams } from "@/types";

export interface AdminContactMessagesTableProps extends IContactMessageParams {
  handlePageChange: Dispatch<SetStateAction<number>>;
}

function MessageDialog({
  message,
  onClose,
}: {
  message: IContactMessage | null;
  onClose: () => void;
}) {
  const { mutate: markRead, isPending } = useMarkContactMessageRead();

  const handleToggleRead = () => {
    if (!message) return;

    markRead(
      { messageId: message.id, isRead: !message.isRead },
      {
        onError: (err) => {
          toast.add({
            title: "Update Failed",
            description: getApiErrorMessage(
              err,
              "The message status could not be updated.",
            ),
            type: "error",
          });
        },
      },
    );
  };

  return (
    <Dialog open={!!message} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader className="pr-12">
          <DialogTitle className="break-all">{message?.subject}</DialogTitle>
          <DialogDescription className="break-all">
            {message
              ? `From ${message.name} <${message.email}> on ${new Date(
                  message.createdAt,
                ).toLocaleString()}`
              : ""}
          </DialogDescription>
        </DialogHeader>

        {message && (
          <div className="px-4">
            <div className="rounded-lg border bg-muted/40 p-4 text-sm whitespace-pre-wrap">
              {message.message}
            </div>

            <DialogFooter className="flex-row flex-wrap justify-center gap-4 mt-3 px-0">
              <Button
                variant="outline"
                size="lg"
                nativeButton={false}
                className="flex-1"
                render={
                  <a
                    href={`mailto:${message.email}?subject=Re: ${message.subject}`}
                  />
                }
              >
                <Mail className="size-4" />
                Reply by email
              </Button>
              <Button size="lg" disabled={isPending} onClick={handleToggleRead}
                className="flex-1">
                {isPending ? (
                  <Spinner />
                ) : message.isRead ? (
                  <MailOpen className="size-4" />
                ) : (
                  <Mail className="size-4" />
                )}
                {message.isRead ? "Mark as unread" : "Mark as read"}
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default function AdminContactMessagesTable({
  handlePageChange,
  ...params
}: AdminContactMessagesTableProps) {
  const { data } = useSuspenseGetContactMessages(params);

  const [selected, setSelected] = useState<IContactMessage | null>(null);

  const messages = data?.data ?? [];
  const totalPages = data?.meta?.totalPages ?? 0;
  const page = params.page ?? 1;

  return (
    <>
      <div className="overflow-hidden rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead>Sender</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>View</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-32 text-center text-muted-foreground"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Inbox className="size-8 opacity-50" />
                    <p className="text-sm">No contact messages found.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              messages.map((message) => (
                <TableRow key={message.id}>
                  <TableCell className="hidden whitespace-nowrap text-muted-foreground md:table-cell">
                    {new Date(message.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell className="max-w-40">
                    <p
                      className={`truncate text-sm ${
                        message.isRead ? "font-medium" : "font-semibold"
                      }`}
                    >
                      {message.name}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {message.email}
                    </p>
                  </TableCell>
                  <TableCell className="max-w-40 md:max-w-60">
                    <p
                      className={`truncate text-sm ${
                        message.isRead ? "font-medium" : "font-semibold"
                      }`}
                    >
                      {message.subject}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {message.message}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Badge variant={message.isRead ? "secondary" : "default"}>
                      {message.isRead ? "Read" : "Unread"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="icon"
                      title="View message"
                      onClick={() => setSelected(message)}
                    >
                      <Eye className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div>
        <TablePagination
          page={page}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>

      <MessageDialog message={selected} onClose={() => setSelected(null)} />
    </>
  );
}
