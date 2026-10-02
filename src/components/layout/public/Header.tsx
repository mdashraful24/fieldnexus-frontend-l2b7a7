"use client";

import { useQueryClient } from "@tanstack/react-query";
import { Menu, Wrench } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from "@/components/ui/toast";
import { useGetMe, useLogout } from "@/hooks/auth.hook";
import { getApiErrorMessage } from "@/lib/apiError";
import type { UserRole } from "@/types/user.type";
import Logo from "@/assets/svg/Logo";

const NAVBAR_REVEAL_DELAY_MS = 500;

const publicRoutes = [
  { name: "Home", url: "/" },
  { name: "About us", url: "/about-us" },
  { name: "Vendors", url: "/vendors" },
];

const roleDashboardMap: Record<UserRole, string> = {
  SUPER_ADMIN: "/admin",
  ADMIN: "/admin",
  TECHNICIAN: "/technician",
  CUSTOMER: "/customer",
};

export default function Header() {
  const pathname = usePathname();
  const { data, isLoading } = useGetMe();
  const { mutate: logout } = useLogout();
  const queryClient = useQueryClient();

  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const role = data?.data?.role as UserRole | undefined;
  const dashboardHref = role ? roleDashboardMap[role] : undefined;
  const isSignedIn = !isLoading && !!data;

  const routes = [
    ...publicRoutes,
    ...(isSignedIn && dashboardHref
      ? [{ name: "Dashboard", url: dashboardHref }]
      : []),
  ];

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let idleTimer: ReturnType<typeof setTimeout> | undefined;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 8);

      if (currentScrollY <= 8) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;

      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        setIsVisible(true);
      }, NAVBAR_REVEAL_DELAY_MS);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(idleTimer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsVisible(true);
    setIsMenuOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.add({
          title: "Logout Successful",
          description: "You have been successfully logged out.",
          type: "success",
        });
        queryClient.removeQueries({ queryKey: ["USER"] });
        setIsMenuOpen(false);
      },
      onError: (err) => {
        toast.add({
          title: "Logout Failed",
          description: getApiErrorMessage(err),
          type: "error",
        });
      },
    });
  };

  const isActive = (url: string) =>
    url === "/" ? pathname === "/" : pathname.startsWith(url);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-transform duration-300 ease-out ${isVisible ? "translate-y-0" : "-translate-y-full"
        } ${isScrolled ? "border-b bg-background/80 backdrop-blur-md" : "border-b border-transparent bg-background"}`}
    >
      <div className="w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14 sm:max-w-150 md:max-w-185 lg:max-w-255 xl:max-w-7xl 2xl:max-w-410 3xl:max-w-[1710px] flex h-16 items-center justify-between gap-2">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 font-heading font-semibold"
        >
          <Logo />
          <span className="text-xl sm:inline">Field Nexus</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {routes.map((route) => (
            <Link
              key={route.url}
              href={route.url}
              aria-current={isActive(route.url) ? "page" : undefined}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary ${isActive(route.url)
                ? "bg-primary/20 text-primary font-semibold"
                : "text-muted-foreground"
                }`}
            >
              {route.name}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          {!isSignedIn && (
            <>
              <Button
                variant="ghost"
                size="lg"
                nativeButton={false}
                render={<Link href="/login" />}
              >
                Login
              </Button>
              <Button
                size="lg"
                nativeButton={false}
                render={<Link href="/register" />}
                className="hidden sm:inline-flex"
              >
                Get started
              </Button>
            </>
          )}
          {isSignedIn && (
            <Button
              variant="destructive"
              size="lg"
              onClick={handleLogout}
              className="hidden sm:inline-flex"
            >
              Logout
            </Button>
          )}

          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger
              render={
                <Button variant="outline" size="icon" className="md:hidden" />
              }
            >
              <Menu className="size-5" />
              <span className="sr-only">Open navigation menu</span>
            </SheetTrigger>

            <SheetContent side="right" className="w-72 sm:w-80">
              <SheetHeader>
                <SheetTitle>Field Nexus</SheetTitle>
                <SheetDescription>
                  Field service management for vendors, technicians, and
                  customers.
                </SheetDescription>
              </SheetHeader>

              <nav className="flex flex-col gap-1 px-4">
                {routes.map((route) => (
                  <SheetClose
                    key={route.url}
                    nativeButton={false}
                    render={
                      <Link
                        href={route.url}
                        aria-current={
                          isActive(route.url) ? "page" : undefined
                        }
                        className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary ${isActive(route.url)
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground"
                          }`}
                      />
                    }
                  >
                    {route.name}
                  </SheetClose>
                ))}
              </nav>

              <div className="mt-auto flex flex-col gap-2 border-t px-4 pt-4">
                {!isSignedIn && (
                  <>
                    <SheetClose
                      nativeButton={false}
                      render={
                        <Button
                          variant="outline"
                          className="p-5 rounded-xl"
                          nativeButton={false}
                          render={<Link href="/login" />}
                        />
                      }
                    >
                      Login
                    </SheetClose>
                    <SheetClose
                      nativeButton={false}
                      render={
                        <Button
                          size="lg"
                          nativeButton={false}
                          render={<Link href="/register" />}
                        />
                      }
                    >
                      Get started
                    </SheetClose>
                  </>
                )}
                {isSignedIn && (
                  <SheetClose
                    nativeButton={false}
                    render={
                      <Button variant="destructive" size="lg" onClick={handleLogout}>
                        Logout
                      </Button>
                    }
                  />
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
