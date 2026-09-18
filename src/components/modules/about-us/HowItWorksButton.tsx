"use client";

import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HowItWorksButton() {
  const smoothScroll = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    gsap.registerPlugin(ScrollToPlugin);
    gsap.to(window, {
      duration: 0.9,
      scrollTo: "#how-it-works",
      ease: "power2.inOut",
      overwrite: "auto",
    });
  };

  return (
    <Button
      size="lg"
      variant="outline"
      render={<Link href="#how-it-works" onClick={smoothScroll} />}
      nativeButton={false}
    >
      How it works
    </Button>
  );
}
