"use client";

import { useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import {
  useApproveTechnician,
  useGetAllTechnicians,
  useRejectTechnician,
} from "@/hooks";
import { ITechnicianParams } from "@/types";
import { rejectApplicationReasonSchema } from "@/validation/technician-application.validation";
import TechnicianStatusBadge from "./technician-status-badge";

interface IProps extends ITechnicianParams {
  selectedId: string;
  onClose: () => void;
}

function Detail({
  label,
  value,
  children,
}: {
  label: string;
  value?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div>
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-0.5 text-sm break-words whitespace-pre-wrap">
        {children ?? value ?? "—"}
      </p>
    </div>
  );
}

export default function TechnicianReviewSheet({
  selectedId,
  onClose,
  ...params
}: IProps) {
  const [confirmRejection, setConfirmRejection] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  const { data } = useGetAllTechnicians(params);
  const { mutate: approveTechnician, isPending: isApproving } =
    useApproveTechnician();
  const { mutate: rejectTechnician, isPending: isRejecting } =
    useRejectTechnician();

  const selectedTechnician = data?.data?.find(
    (technician) => technician.id === selectedId,
  );

  const handleClose = () => {
    setConfirmRejection(false);
    setRejectionReason("");
    onClose();
  };

  const handleApprove = () => {
    approveTechnician(selectedId, {
      onSuccess: (res) => {
        console.log("Technician approval response:", res);
        toast.add({
          title: "Success",
          description: res?.message || "Technician approved successfully.",
          type: "success",
        });
        handleClose();
      },
      onError: (err) => {
        toast.add({
          title: "Error",
          description:
            err?.message || "An error occurred while approving the technician.",
          type: "destructive",
        });
      },
    });
  };

  const handleReject = () => {
    const validationResult = rejectApplicationReasonSchema.safeParse({
      rejectionReason,
    });

    if (!validationResult.success) {
      toast.add({
        title: "Error",
        description:
          validationResult.error.issues[0]?.message ||
          "Please provide a valid rejection reason.",
        type: "destructive",
      });
      return;
    }

    rejectTechnician(
      {
        applicationId: selectedId,
        rejectionReason: validationResult.data.rejectionReason,
      },
      {
        onSuccess: (res) => {
          console.log("Technician rejection response:", res);
          toast.add({
            title: "Success",
            description: res?.message || "Technician rejected successfully.",
            type: "success",
          });
          handleClose();
        },
        onError: (err) => {
          toast.add({
            title: "Error",
            description:
              err?.message ||
              "An error occurred while rejecting the technician.",
            type: "destructive",
          });
        },
      },
    );
  };

  if (!selectedTechnician) return null;

  return (
    <Sheet open={!!selectedId} onOpenChange={handleClose}>
      <SheetContent>
        <SheetHeader>
          <div className="min-w-0">
            <SheetTitle className="break-all flex items-center gap-2">
              {selectedTechnician.name}
              <TechnicianStatusBadge status={selectedTechnician.status} />
            </SheetTitle>
            <SheetDescription className="break-all">
              {selectedTechnician.email}
            </SheetDescription>
          </div>
        </SheetHeader>

        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-4">
          <div className="space-y-4">
            <Detail label="Application ID" value={selectedTechnician.id} />
            <Detail
              label="Contact Number"
              value={selectedTechnician.contactNumber}
            />
            <Detail label="Address" value={selectedTechnician.address} />

            <Separator />

            <Detail
              label="Qualifications"
              value={selectedTechnician.qualifications}
            />
            <Detail
              label="Experience"
              value={`${selectedTechnician.experienceYears} year${
                selectedTechnician.experienceYears === 1 ? "" : "s"
              }`}
            />

            {selectedTechnician.skills.length > 0 && (
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Skills
                </p>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {selectedTechnician.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {selectedTechnician.bio && (
              <Detail label="Bio" value={selectedTechnician.bio} />
            )}

            {selectedTechnician.resume && (
              <Detail label="Resume">
                <a
                  href={selectedTechnician.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-4"
                >
                  View Resume
                </a>
              </Detail>
            )}

            <Separator />

            {selectedTechnician.reviewedAt && (
              <Detail
                label="Reviewed At"
                value={new Date(selectedTechnician.reviewedAt).toLocaleString()}
              />
            )}

            {selectedTechnician.status === "REJECTED" &&
              selectedTechnician.rejectionReason && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Rejection Reason
                  </p>
                  <p className="mt-0.5 text-sm break-words whitespace-pre-wrap text-destructive">
                    {selectedTechnician.rejectionReason}
                  </p>
                </div>
              )}

            {selectedTechnician.technician && (
              <Detail
                label="Technician Account"
                value={`${selectedTechnician.technician.name} (${selectedTechnician.technician.email})`}
              />
            )}
          </div>
        </div>

        <SheetFooter>
          {selectedTechnician.status !== "PENDING" ? (
            <p className="text-sm text-muted-foreground">
              This application has already been reviewed.
            </p>
          ) : confirmRejection ? (
            <div className="flex w-full flex-col gap-4">
              <Textarea
                value={rejectionReason}
                placeholder="Enter rejection reason..."
                onChange={(e) => setRejectionReason(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                {/* <Button
                  variant="destructive"
                  size="lg"
                  onClick={handleClose}
                  className="flex-1"
                >
                  Cancel
                </Button> */}
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleReject}
                  disabled={!rejectionReason.trim() || isRejecting}
                >
                  {isRejecting ? (
                    <>
                      <Spinner />
                      Confirming...
                    </>
                  ) : (
                    "Confirm Rejection"
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="destructive"
                size="lg"
                className="flex-1"
                onClick={() => setConfirmRejection(true)}
                disabled={isApproving}
              >
                Reject
              </Button>
              <Button
                variant="default"
                size="lg"
                className="flex-1"
                onClick={handleApprove}
                disabled={isApproving}
              >
                {isApproving ? (
                  <>
                    <Spinner />
                    Verifying...
                  </>
                ) : (
                  "Verify"
                )}
              </Button>
            </div>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}