import {
  CheckCircle2,
  ClipboardList,
  CreditCard,
  LayoutDashboard,
  MessageSquare,
  Shield,
  UserCog,
  Users,
  Wrench,
  Zap,
} from "lucide-react";

export const STORAGE_KEY = "field-nexus:welcome-seen-v1";
export const TOTAL_STEPS = 3;

export const roles = [
  {
    icon: UserCog,
    label: "Admin",
    color: "from-blue-500/20 to-blue-600/5",
    iconColor: "text-violet-500",
    ringColor: "ring-violet-500/30",
    description: "Approve requests, assign vendors, oversee all operations.",
  },
  {
    icon: Shield,
    label: "Vendor",
    color: "from-blue-500/5 to-blue-600/20",
    iconColor: "text-sky-500",
    ringColor: "ring-sky-500/30",
    description: "Receive jobs, dispatch technicians, manage your team.",
  },
  {
    icon: Wrench,
    label: "Technician",
    color: "from-blue-500/20 to-blue-600/5",
    iconColor: "text-amber-500",
    ringColor: "ring-amber-500/30",
    description: "Accept assignments, submit reports, close jobs on-site.",
  },
  {
    icon: Users,
    label: "Customer",
    color: "from-blue-500/5 to-blue-600/20",
    iconColor: "text-emerald-500",
    ringColor: "ring-emerald-500/30",
    description: "Raise service requests, track progress, leave feedback.",
  },
];

export const features = [
  {
    icon: ClipboardList,
    title: "Work Order Management",
    description:
      "Create, track, and manage every work order through its full lifecycle from request to resolution.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: LayoutDashboard,
    title: "Real-Time Dashboard",
    description:
      "Live status boards and KPIs give every role exactly the visibility they need.",
    color: "text-sky-500",
    bg: "bg-sky-500/10",
  },
  {
    icon: Zap,
    title: "Smart Dispatch",
    description:
      "Connect the right technician to every job instantly. Intelligent assignment cuts idle time.",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    icon: CreditCard,
    title: "Payment & Invoicing",
    description:
      "Approve quotes, issue invoices, and track payments all in one place.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    icon: MessageSquare,
    title: "Feedback & Reviews",
    description:
      "Customers rate completed work; admins use insights to improve performance.",
    color: "text-rose-500",
    bg: "bg-rose-500/10",
  },
  {
    icon: CheckCircle2,
    title: "End-to-End Traceability",
    description:
      "Every action is logged. Full audit trails keep stakeholders informed and accountable.",
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
];
