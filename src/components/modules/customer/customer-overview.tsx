"use client";

import {
  ArrowRight,
  Banknote,
  CalendarDays,
  CalendarPlus,
  CheckCircle2,
  CreditCard,
  ListChecks,
  Receipt,
  RotateCcw,
  Sparkles,
  UserCog,
  UserRound,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartEmpty,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { useSuspenseGetAllPayments } from "@/hooks";
import type { IPayment, PaymentStatus } from "@/types";
import PaymentStatusBadge from "../payment/payment-status-badge";

const statusOrder: PaymentStatus[] = [
  "PAID",
  "UNPAID",
  "REFUNDED",
  "FAILED",
  "CANCELLED",
];

const statusColors: Record<PaymentStatus, string> = {
  PAID: "var(--color-emerald-500)",
  UNPAID: "var(--color-amber-500)",
  REFUNDED: "var(--color-violet-500)",
  FAILED: "var(--color-red-500)",
  CANCELLED: "var(--color-muted-foreground)",
};

const statusChartConfig = {
  value: { label: "Payments" },
  ...Object.fromEntries(
    statusOrder.map((status) => [
      status,
      { label: toLabel(status), color: statusColors[status] },
    ]),
  ),
} satisfies ChartConfig;

const trendChartConfig = {
  total: { label: "Paid", color: "var(--color-chart-1)" },
} satisfies ChartConfig;

function toLabel(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

function percent(part: number, total: number) {
  if (!total) return 0;
  return Math.round((part / total) * 100);
}

function formatCurrency(value: number) {
  return `৳${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
}

function buildMonthlyTrend(payments: IPayment[]) {
  const months = 6;
  const now = new Date();

  return Array.from({ length: months }, (_, index) => {
    const cursor = new Date(
      now.getFullYear(),
      now.getMonth() - (months - 1 - index),
      1,
    );
    const key = `${cursor.getFullYear()}-${cursor.getMonth()}`;

    const total = payments
      .filter((payment) => {
        const date = new Date(payment.paidAt ?? payment.createdAt);
        return `${date.getFullYear()}-${date.getMonth()}` === key;
      })
      .filter((payment) => payment.status === "PAID")
      .reduce((sum, payment) => sum + Number(payment.amount), 0);

    return {
      month: cursor.toLocaleDateString(undefined, { month: "short" }),
      total,
    };
  });
}

function KpiCard({
  label,
  value,
  hint,
  icon,
  accent,
  to,
}: {
  label: string;
  value: string | number;
  hint?: string;
  icon: ReactNode;
  accent: string;
  to?: string;
}) {
  const body = (
    <>
      <div className="flex items-start justify-between gap-3">
        <span
          className="grid size-10 shrink-0 place-items-center rounded-xl"
          style={{
            backgroundColor: `color-mix(in oklab, ${accent} 14%, transparent)`,
            color: accent,
          }}
        >
          {icon}
        </span>
        {to ? (
          <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
        ) : null}
      </div>

      <div className="mt-4">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-heading text-3xl font-semibold tracking-tight tabular-nums">
          {value}
        </p>
        {hint ? (
          <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>
        ) : null}
      </div>
    </>
  );

  const className =
    "group flex flex-col rounded-xl bg-card p-5 ring-1 ring-foreground/10 transition-colors";

  if (!to) {
    return <div className={className}>{body}</div>;
  }

  return (
    <Link href={to} className={className}>
      {body}
    </Link>
  );
}

function Meter({ value, tone }: { value: number; tone: string }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
      <div
        className="h-full rounded-full"
        style={{
          width: `${Math.min(Math.max(value, 0), 100)}%`,
          backgroundColor: tone,
        }}
      />
    </div>
  );
}

function LegendList({
  items,
  total,
}: {
  items: { label: string; count: number; color: string }[];
  total: number;
}) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item.label} className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between gap-2 text-sm">
            <span className="flex items-center gap-2">
              <span
                className="size-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              {item.label}
            </span>
            <span className="font-medium tabular-nums">
              {item.count}
              <span className="ml-1 text-xs font-normal text-muted-foreground">
                {percent(item.count, total)}%
              </span>
            </span>
          </div>
          <Meter value={percent(item.count, total)} tone={item.color} />
        </li>
      ))}
    </ul>
  );
}

function QuickLink({
  label,
  description,
  to,
  icon,
  tone,
}: {
  label: string;
  description: string;
  to: string;
  icon: ReactNode;
  tone: string;
}) {
  return (
    <Link
      href={to}
      className="group flex items-center gap-3 rounded-lg bg-muted/50 p-3 transition-colors hover:bg-muted"
    >
      <span
        className="grid size-8 shrink-0 place-items-center rounded-lg"
        style={{
          backgroundColor: `color-mix(in oklab, ${tone} 14%, transparent)`,
          color: tone,
        }}
      >
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium">{label}</span>
        <span className="block truncate text-xs text-muted-foreground">
          {description}
        </span>
      </span>
      <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

export function CustomerOverviewLoading() {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton className="h-28 w-full rounded-2xl" />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: static placeholder tiles
            key={index}
            className="flex flex-col rounded-xl bg-card p-5 ring-1 ring-foreground/10"
          >
            <Skeleton className="size-10 rounded-xl" />
            <div className="mt-4 space-y-2">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-8 w-20" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl bg-card p-5 ring-1 ring-foreground/10 lg:col-span-2">
          <div className="space-y-2">
            <Skeleton className="h-4 w-44" />
            <Skeleton className="h-3 w-56" />
          </div>
          <Skeleton className="mt-6 h-56 w-full rounded-lg" />
        </div>
        <div className="rounded-xl bg-card p-5 ring-1 ring-foreground/10">
          <div className="space-y-2">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-3 w-28" />
          </div>
          <Skeleton className="mx-auto mt-5 size-40 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default function CustomerOverview() {
  const { data } = useSuspenseGetAllPayments({ page: 1, limit: 50 });

  const payments = data?.data ?? [];
  const total = payments.length;

  const paidPayments = payments.filter((payment) => payment.status === "PAID");
  const unpaidPayments = payments.filter(
    (payment) => payment.status === "UNPAID",
  );
  const refundedPayments = payments.filter(
    (payment) => payment.status === "REFUNDED",
  );

  const totalPaid = paidPayments.reduce(
    (sum, payment) => sum + Number(payment.amount),
    0,
  );
  const totalDue = unpaidPayments.reduce(
    (sum, payment) => sum + Number(payment.amount),
    0,
  );
  const totalRefunded = refundedPayments.reduce(
    (sum, payment) => sum + Number(payment.refundAmount ?? payment.amount),
    0,
  );

  const statusData = statusOrder
    .map((status) => ({
      status: toLabel(status),
      key: status,
      fill: statusColors[status],
      value: payments.filter((payment) => payment.status === status).length,
    }))
    .filter((entry) => entry.value > 0);

  const trendData = buildMonthlyTrend(payments);
  const hasTrendData = trendData.some((entry) => entry.total > 0);

  const gatewayData = Array.from(
    payments.reduce((map, payment) => {
      const gateway = payment.gateway || "Other";
      map.set(gateway, (map.get(gateway) ?? 0) + Number(payment.amount));
      return map;
    }, new Map<string, number>()),
  )
    .map(([gateway, amount]) => ({ label: toLabel(gateway), amount }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 4);

  const maxGatewayAmount = Math.max(
    ...gatewayData.map((entry) => entry.amount),
    1,
  );

  const recentPayments = payments.slice(0, 5);

  return (
    <div className="flex flex-col gap-6">
      <section className="relative overflow-hidden rounded-2xl bg-primary p-5 text-primary-foreground lg:p-6">
        <div
          aria-hidden
          className="absolute -top-12 -right-12 size-48 rounded-full bg-primary-foreground/10"
        />
        <div
          aria-hidden
          className="absolute -bottom-16 right-24 size-40 rounded-full bg-primary-foreground/5"
        />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary-foreground/15">
              <Sparkles className="size-5" />
            </span>
            <div>
              <h2 className="font-heading text-lg font-semibold">
                Need something fixed?
              </h2>
              <p className="text-sm text-primary-foreground/80">
                Book a service and a vetted technician will be assigned to your
                request.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/customer/create-booking"
              className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-primary-foreground px-4 text-sm font-semibold text-primary transition-opacity hover:opacity-90"
            >
              <CalendarPlus size="16" />
              Book a service
            </Link>
            <Link
              href="/customer/bookings"
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-primary-foreground/30 px-4 text-sm font-medium transition-colors hover:bg-primary-foreground/10"
            >
              <ListChecks size="16" />
              My bookings
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Total Paid"
          value={formatCurrency(totalPaid)}
          hint={`${paidPayments.length} settled payments`}
          icon={<Banknote className="size-5" />}
          accent="var(--color-emerald-500)"
        />
        <KpiCard
          label="Amount Due"
          value={formatCurrency(totalDue)}
          hint={
            unpaidPayments.length > 0
              ? `${unpaidPayments.length} awaiting payment`
              : "Nothing outstanding"
          }
          icon={<Wallet className="size-5" />}
          accent="var(--color-amber-500)"
          to="/customer/payment-history"
        />
        <KpiCard
          label="Refunded"
          value={formatCurrency(totalRefunded)}
          hint={`${refundedPayments.length} refunded payments`}
          icon={<RotateCcw className="size-5" />}
          accent="var(--color-violet-500)"
        />
        <KpiCard
          label="Transactions"
          value={total}
          hint="Across all your bookings"
          icon={<Receipt className="size-5" />}
          accent="var(--color-chart-1)"
          to="/customer/payment-history"
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Spending Over Time</CardTitle>
            <CardDescription>
              Settled payments per month across the last six months.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!hasTrendData ? (
              <ChartEmpty message="No settled payments to chart yet." />
            ) : (
              <ChartContainer config={trendChartConfig} className="h-56 w-full">
                <BarChart data={trendData} margin={{ left: 4, right: 8 }}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    width={64}
                    tickFormatter={(value: number) =>
                      `৳${value.toLocaleString()}`
                    }
                  />
                  <ChartTooltip
                    cursor={{ fill: "var(--color-muted)" }}
                    content={
                      <ChartTooltipContent
                        formatter={(value) => formatCurrency(Number(value))}
                      />
                    }
                  />
                  <Bar
                    dataKey="total"
                    fill="var(--color-chart-1)"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={56}
                  />
                </BarChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Payments by Status</CardTitle>
            <CardDescription>
              How your payments are distributed.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {statusData.length === 0 ? (
              <ChartEmpty message="No payments recorded yet." />
            ) : (
              <>
                <ChartContainer
                  config={statusChartConfig}
                  className="mx-auto h-40 w-full"
                >
                  <PieChart>
                    <ChartTooltip
                      content={<ChartTooltipContent nameKey="key" />}
                    />
                    <Pie
                      data={statusData}
                      dataKey="value"
                      nameKey="status"
                      innerRadius={44}
                      outerRadius={72}
                      paddingAngle={3}
                      strokeWidth={0}
                    >
                      {statusData.map((entry) => (
                        <Cell key={entry.key} fill={entry.fill} />
                      ))}
                    </Pie>
                  </PieChart>
                </ChartContainer>
                <div className="mt-2">
                  <LegendList
                    items={statusData.map((entry) => ({
                      label: entry.status,
                      count: entry.value,
                      color: entry.fill,
                    }))}
                    total={total}
                  />
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Recent Payments</CardTitle>
            <CardDescription>
              Your five most recent transactions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recentPayments.length === 0 ? (
              <ChartEmpty message="You have no payments yet. Book a service to get started." />
            ) : (
              <ul className="flex flex-col gap-2">
                {recentPayments.map((payment) => (
                  <li
                    key={payment.id}
                    className="flex items-center justify-between gap-3 rounded-lg bg-muted/50 p-3"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-card text-muted-foreground ring-1 ring-foreground/10">
                        <CreditCard size="16" />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-heading text-sm font-semibold tabular-nums">
                          {formatCurrency(Number(payment.amount))}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          {payment.merchantInvoiceNumber ??
                            toLabel(payment.gateway)}{" "}
                          ·{" "}
                          {new Date(
                            payment.paidAt ?? payment.createdAt,
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <PaymentStatusBadge status={payment.status} />
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Settlement Health</CardTitle>
              <CardDescription>
                Share of payments already settled.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-sm text-muted-foreground">
                  Settled payments
                </span>
                <span className="font-heading text-xl font-semibold tabular-nums">
                  {percent(paidPayments.length, total)}%
                </span>
              </div>
              <Meter
                value={percent(paidPayments.length, total)}
                tone={
                  total > 0 && unpaidPayments.length > 0
                    ? "var(--color-amber-500)"
                    : "var(--color-emerald-500)"
                }
              />
              <div className="grid gap-3 border-t pt-4 sm:grid-cols-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 shrink-0 text-emerald-500" />
                  <div>
                    <p className="text-xs text-muted-foreground">Settled</p>
                    <p className="font-medium tabular-nums">
                      {paidPayments.length}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="size-4 shrink-0 text-amber-500" />
                  <div>
                    <p className="text-xs text-muted-foreground">Outstanding</p>
                    <p className="font-medium tabular-nums">
                      {unpaidPayments.length}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Payment Methods</CardTitle>
              <CardDescription>
                Where your money went, by gateway.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {gatewayData.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No payment methods recorded yet.
                </p>
              ) : (
                <ul className="flex flex-col gap-3">
                  {gatewayData.map((entry) => (
                    <li key={entry.label} className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between gap-2 text-sm">
                        <span className="text-muted-foreground">
                          {entry.label}
                        </span>
                        <span className="font-medium tabular-nums">
                          {formatCurrency(entry.amount)}
                        </span>
                      </div>
                      <Meter
                        value={(entry.amount / maxGatewayAmount) * 100}
                        tone="var(--color-chart-2)"
                      />
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-col gap-2">
                <li>
                  <QuickLink
                    label="Payment History"
                    description="Review every transaction"
                    to="/customer/payment-history"
                    icon={<Banknote size={16} />}
                    tone="var(--color-emerald-500)"
                  />
                </li>
                <li>
                  <QuickLink
                    label="My Profile"
                    description="Review your account details"
                    to="/profile"
                    icon={<UserRound size={16} />}
                    tone="var(--color-chart-1)"
                  />
                </li>
                <li>
                  <QuickLink
                    label="Edit Profile"
                    description="Update your photo and name"
                    to="/profile/edit"
                    icon={<UserCog size={16} />}
                    tone="var(--color-violet-500)"
                  />
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
