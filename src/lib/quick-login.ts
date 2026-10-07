export type QuickLoginRole =
  | "super-admin"
  | "admin"
  | "technician"
  | "customer";

export type QuickLoginProfile = {
  role: QuickLoginRole;
  label: string;
  email: string;
  password: string;
};

const envProfiles: Array<{
  role: QuickLoginRole;
  label: string;
  email: string | undefined;
  password: string | undefined;
}> = [
  {
    role: "super-admin",
    label: "Super Admin",
    email: process.env.NEXT_PUBLIC_QUICK_LOGIN_SUPER_ADMIN_EMAIL,
    password: process.env.NEXT_PUBLIC_QUICK_LOGIN_SUPER_ADMIN_PASSWORD,
  },
  {
    role: "admin",
    label: "Admin",
    email: process.env.NEXT_PUBLIC_QUICK_LOGIN_ADMIN_EMAIL,
    password: process.env.NEXT_PUBLIC_QUICK_LOGIN_ADMIN_PASSWORD,
  },
  {
    role: "technician",
    label: "Technician",
    email: process.env.NEXT_PUBLIC_QUICK_LOGIN_TECHNICIAN_EMAIL,
    password: process.env.NEXT_PUBLIC_QUICK_LOGIN_TECHNICIAN_PASSWORD,
  },
  {
    role: "customer",
    label: "Customer",
    email: process.env.NEXT_PUBLIC_QUICK_LOGIN_CUSTOMER_EMAIL,
    password: process.env.NEXT_PUBLIC_QUICK_LOGIN_CUSTOMER_PASSWORD,
  },
];

export const quickLoginProfiles: QuickLoginProfile[] = envProfiles.flatMap(
  ({ role, label, email, password }) =>
    email && password ? [{ role, label, email, password }] : [],
);
