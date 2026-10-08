"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { STORAGE_KEY, TOTAL_STEPS } from "./data";
import { StepDots } from "./StepDots";
import { StepFeatures } from "./StepFeatures";
import { StepHero } from "./StepHero";
import { StepRoles } from "./StepRoles";

export function WelcomeModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.localStorage.getItem(STORAGE_KEY)) {
      setOpen(true);
    }
  }, []);

  const handleClose = () => {
    window.localStorage.setItem(STORAGE_KEY, "true");
    setOpen(false);
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS - 1) {
      setStep((s) => s + 1);
    } else {
      handleClose();
    }
  };

  const handleBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const isLast = step === TOTAL_STEPS - 1;

  return (
    <Dialog open={open}>
      <DialogContent
        showCloseButton={false}
        className="max-h-[min(93dvh,760px)] w-[calc(100%-1.5rem)] max-w-xl gap-0 overflow-hidden p-0"
      >
        {/* Animated progress bar */}
        {/* <div className="relative h-1 w-full overflow-hidden bg-muted">
          <div
            className="absolute inset-y-0 left-0 bg-linear-to-r from-primary to-sky-500 transition-all duration-500 ease-out"
            style={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
          />
        </div> */}

        {/* Scrollable body */}
        <div className="overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden">
          {/* Step content area */}
          <div className="relative overflow-hidden border-b border-border/50 bg-linear-to-br from-primary/8 via-background to-sky-500/5 px-6 pb-6 pt-7 sm:px-8">
            {/* Background blobs */}
            <div className="pointer-events-none absolute -top-12 -right-12 size-48 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-8 size-36 rounded-full bg-sky-500/10 blur-2xl" />

            {/* Accessible title/description for screen readers */}
            <DialogTitle className="sr-only">Welcome to Field Nexus</DialogTitle>
            <DialogDescription className="sr-only">
              An onboarding overview of the Field Nexus field service management
              platform.
            </DialogDescription>

            {/* Visible step content */}
            <div className="relative">
              {step === 0 && <StepHero />}
              {step === 1 && <StepRoles />}
              {step === 2 && <StepFeatures />}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between gap-4 border-t border-border/50 bg-muted/20 px-6 py-4">
            {/* Step dots + counter */}
            <div className="flex items-center gap-3">
              <StepDots current={step} total={TOTAL_STEPS} />
              <span className="hidden text-xs text-muted-foreground sm:block">
                {step + 1} / {TOTAL_STEPS}
              </span>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center gap-3">
              {step > 0 && (
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={handleBack}
                  className="gap-1.5 text-muted-foreground hover:text-foreground"
                >
                  <ChevronLeft className="size-3.5" aria-hidden="true" />
                  Back
                </Button>
              )}

              {step === 0 && (
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={handleClose}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Skip tour
                </Button>
              )}

              <Button
                onClick={handleNext}
                size="lg"
                className="gap-1.5 shadow-sm shadow-primary/20 hover:shadow-primary/30"
              >
                {isLast ? (
                  <>
                    Get started
                    <Sparkles className="size-3.5" aria-hidden="true" />
                  </>
                ) : (
                  <>
                    Next
                    <ChevronRight className="size-3.5" aria-hidden="true" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
