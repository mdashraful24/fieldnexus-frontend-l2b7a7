# Field Nexus Frontend — 8-Minute Video Script

**Language:** English  
**Target duration:** Approximately 8 minutes  
**Demo URL:** Use the running local or deployed application URL  
**Recommended browser:** Chrome or Edge with DevTools available

## Before recording

1. Start the frontend with `bun dev` and open the application.
2. Confirm that the API is reachable and that the quick-login variables are configured in
   `.env.local`. The buttons are generated from
   [`src/lib/quick-login.ts`](./src/lib/quick-login.ts), so only configured demo roles appear.
3. Open a second tab for the login page and keep DevTools ready. In DevTools, prepare:
   - **Network:** Preserve log, disable cache while DevTools is open.
   - **Device toolbar:** Ready for the responsive demonstration.
4. Use seeded demo accounts only. Do not show passwords or environment-variable values on
   screen.

## Recording plan

| Time | Segment |
| --- | --- |
| 0:00–0:55 | Product overview and UI/UX philosophy |
| 0:55–1:45 | Next.js architecture |
| 1:45–3:05 | Customer quick login and dashboard |
| 3:05–4:25 | Admin role, dynamic navigation, and protected routes |
| 4:25–5:35 | Data loading, API integration, and TanStack Query |
| 5:35–6:35 | Validation and API error handling |
| 6:35–7:25 | Responsive design and offline-aware UX |
| 7:25–8:00 | Summary and closing |

## 0:00–0:55 — Product overview and UI/UX philosophy

**On screen:** Start at the Field Nexus landing page and briefly scroll through the hero,
features, roles, and call-to-action sections.

**Narration:**

> Field Nexus is a service-management platform that connects customers, technicians,
> vendors, and administrators in one workflow. A customer can request a service, track
> bookings and payments, and leave feedback. A technician can manage assigned work orders,
> submit service reports, and review payments. Administrators manage users, vendors,
> technician approvals, work orders, service categories, payments, and audit logs. Super
> admins also receive administration controls.
>
> The UI uses a calm, dashboard-first design system: clear page headings, grouped
> navigation, consistent cards and tables, semantic status badges, accessible controls,
> and responsive spacing. The goal is to reduce operational friction: each role sees the
> actions and information needed for that role instead of navigating through an
> overwhelming generic interface.

**Show these implementation references briefly if useful:**

- Public experience: [`src/app/(public)/(marketing)/page.tsx`](./src/app/(public)/(marketing)/page.tsx)
- Shared dashboard shell: [`src/components/dashboard/dashboard-shell.tsx`](./src/components/dashboard/dashboard-shell.tsx)
- Role-specific navigation: [`src/components/dashboard/dashboard-sidebar.tsx`](./src/components/dashboard/dashboard-sidebar.tsx)
- Customer routes: [`src/routes/customer.routes.ts`](./src/routes/customer.routes.ts)
- Technician routes: [`src/routes/technician.routes.ts`](./src/routes/technician.routes.ts)
- Admin routes: [`src/routes/admin.routes.ts`](./src/routes/admin.routes.ts)

## 0:55–1:45 — Next.js architecture

**On screen:** Use the editor or repository view to show the files below, then return to the
browser.

**Narration:**

> This is a Next.js App Router project. The root layout in
> [`src/app/layout.tsx`](./src/app/layout.tsx) is the shared server-side layout. It defines
> metadata, fonts, the global stylesheet, the theme provider, application providers, and
> the toast host. This keeps global concerns in one place.
>
> The route pages and layouts are server components by default. For example,
> [`src/app/(dashboard)/admin/page.tsx`](./src/app/(dashboard)/admin/page.tsx) renders the
> admin page structure and wraps the data-heavy overview in a Suspense boundary.
> Interactive behavior is isolated in client components such as the login form, dashboard
> sidebar, role guard, query hooks, dialogs, and tables. Those components use
> `"use client"` because they need browser state, event handlers, navigation, or TanStack
> Query.
>
> The dashboard layout passes children through the authentication guard, while each role
> layout adds a role guard. This means authentication and authorization are enforced close
> to the route boundary rather than only hidden in the UI.

**Important loading note for the recording:**

> The current project does not contain a route-segment `loading.tsx` file. Instead, it
> demonstrates loading at the feature boundary with `Suspense` and skeleton components.
> Show [`src/app/(dashboard)/admin/page.tsx`](./src/app/(dashboard)/admin/page.tsx) and
> [`src/components/modules/admin/admin-overview-loading.tsx`](./src/components/modules/admin/admin-overview-loading.tsx)
> in action. This is the loading pattern currently implemented in the repository.

Also point out:

- Dashboard authentication boundary:
  [`src/app/(dashboard)/layout.tsx`](./src/app/(dashboard)/layout.tsx)
- Client authentication check:
  [`src/components/auth/auth-guard.tsx`](./src/components/auth/auth-guard.tsx)
- Role check and access-denied state:
  [`src/components/auth/role-guard.tsx`](./src/components/auth/role-guard.tsx)

## 1:45–3:05 — One-click login as Role 1: Customer

**On screen:** Navigate to `/login`.

**Narration and actions:**

> I’ll now use the One-Click Demo Login. These buttons are not hard-coded credentials in
> the component. They are built from configured public demo profiles, which makes the
> recording convenient without changing the normal login flow.

1. Click **Customer**.
2. Let the redirect complete and land on the customer dashboard.
3. Show the sidebar and briefly open:
   - **Overview**
   - **Book a Service**
   - **Bookings**
   - **Payment History**
   - **My Profile**
4. Open **Book a Service** and point out the focused form layout and page explanation.

**Narration:**

> This is the customer view. The sidebar is limited to customer actions, while the
> dashboard shell still provides the shared header, breadcrumb, theme toggle,
> notifications, offline indicator, and profile menu. The customer can create a booking,
> monitor work-order progress, and inspect payment history without seeing administration
> controls.
>
> The booking form is a good example of progressive, task-focused UX: the customer
> provides the service title, description, category, priority, and scheduling information,
> and the backend workflow can then assign the appropriate technician.

**Code callouts:**

- Customer role layout:
  [`src/app/(dashboard)/customer/layout.tsx`](./src/app/(dashboard)/customer/layout.tsx)
- Booking page:
  [`src/app/(dashboard)/customer/create-booking/page.tsx`](./src/app/(dashboard)/customer/create-booking/page.tsx)
- Booking form:
  [`src/components/modules/customer/create-booking-form.tsx`](./src/components/modules/customer/create-booking-form.tsx)

## 3:05–4:25 — One-click login as Role 2: Admin

**On screen:** Use the profile menu to log out, return to `/login`, then click **Admin**.

**Narration and actions:**

> I’ll log out and sign in as the second role, Admin. Notice that this is not just a
> different label on the same page. The route layout and sidebar are role-aware.

1. Open the admin overview and point out the metric cards.
2. Show the admin sidebar: Users, Technician Approval, Vendors, Work Orders,
   Payments, Service Categories, and Audit Logs.
3. Open **Users** and then **Work Orders**.
4. If safe in the demo data, open a user or work-order details panel without changing data.

**Narration:**

> Admin users can see operational and monitoring tools that are not present in the
> customer navigation. The admin layout allows both `ADMIN` and `SUPER_ADMIN`, while the
> customer layout allows only `CUSTOMER`. The role guard checks the authenticated user
> returned by the API; an unauthenticated user is redirected to login and an
> unauthorized user receives an access-denied state.
>
> The sidebar also derives its effective role from the current user query, so navigation
> updates from the authenticated role rather than relying only on a client-side guess.
> This is the role-based UI behavior in action.

**Optional route protection demonstration:** Open `/admin/users` in a private/incognito
tab without authenticating. Show the auth loading state followed by the redirect to
`/login`. Do not attempt to bypass a protected route.

## 4:25–5:35 — Data loading, API integration, and TanStack Query

**On screen:** Stay on Admin Overview or Users. Open DevTools → Network and reload the page.

**Narration and actions:**

> This page is data-heavy, so I’ll show both the loading state and the populated state.
> On the first render, the Suspense fallback displays skeleton cards or table rows instead
> of a blank page. Once the request completes, the real metrics or rows replace the
> skeleton without shifting the whole layout.

1. Enable **Slow 3G** or temporarily throttle the network.
2. Reload the admin overview and capture the skeleton state.
3. Restore normal speed and show the populated metrics.
4. In Network, identify the API request for dashboard stats or users. Point out the
   request method, status, and response timing.
5. Navigate away and back, or revisit the same page, and point out that the UI can reuse
   cached query data instead of unnecessarily duplicating work.

**Narration:**

> API calls are centralized through the API client, which uses the configured base URL,
> includes credentials for the authenticated session, and routes fetches through the
> offline-aware layer. TanStack Query is initialized in
> [`src/providers/query.provider.tsx`](./src/providers/query.provider.tsx) with a
> one-minute stale time. The admin hooks use stable query keys such as
> `["admin", "dashboard-stats"]` and `["admin", "users", params]`, which supports
> caching, loading state management, and targeted invalidation after mutations.
>
> For example, [`src/hooks/admin.hook.ts`](./src/hooks/admin.hook.ts) uses suspense
> queries for dashboard stats and users. The users table has a dedicated loading
> component at
> [`src/components/modules/admin/admin-users-table-loading.tsx`](./src/components/modules/admin/admin-users-table-loading.tsx).

## 5:35–6:35 — Form validation and error handling

### Client validation

**On screen:** Navigate to the login form or customer booking form.

1. Submit the login form with an invalid email and a short/simple password, or submit the
   booking form with an empty title.
2. Pause on the inline field messages.

**Narration:**

> Validation happens before the API call. The forms are connected to Zod schemas, so the
> user receives field-level messages such as an invalid email, a password policy
> violation, or a required booking title. This gives immediate feedback and avoids
> sending data that cannot be accepted.

Useful references:

- Login and password rules:
  [`src/validation/auth.validation.ts`](./src/validation/auth.validation.ts)
- Work-order/booking rules:
  [`src/validation/user.validation.ts`](./src/validation/user.validation.ts)
- Login form field rendering:
  [`src/components/form/login-form.tsx`](./src/components/form/login-form.tsx)

### API error state

**On screen:** Return to Admin Users or Admin Overview.

1. Open DevTools → Network.
2. Select **Offline**, then reload the data-heavy page, or block the relevant API request.
3. Show the visible error state and the **Try again** action.
4. Restore the network and click **Try again**.

**Narration:**

> When the request fails, the interface does not present fake empty data. The admin error
> boundary shows a clear failure message and a retry action. Mutations and authentication
> failures also surface through the shared toast system. This preserves the distinction
> between loading, an empty result, and a real API failure.

References:

- Admin error boundary:
  [`src/app/(dashboard)/admin/users/error.tsx`](./src/app/(dashboard)/admin/users/error.tsx)
- Shared error presentation:
  [`src/components/modules/admin/page-error.tsx`](./src/components/modules/admin/page-error.tsx)
- API client:
  [`src/lib/apiClient.ts`](./src/lib/apiClient.ts)

## 6:35–7:25 — Responsive design and offline-aware UX

**On screen:** Open DevTools → device toolbar and test a mobile preset, then a desktop
width.

**Narration and actions:**

> The layout is responsive rather than simply scaled down. On mobile, the sidebar becomes
> a compact navigation surface, the header keeps the most important actions available,
> tables and cards can scroll or reflow, and form spacing stays touch-friendly. On larger
> screens, the sidebar and dashboard content use the available width for efficient
> operations.

1. Show the landing page at mobile width.
2. Show the customer booking form at mobile width.
3. Show the admin table at mobile width, then widen the viewport.
4. Toggle the network offline briefly and point out the offline indicator.

**Narration:**

> The application also includes an offline-aware fetch and synchronization layer. The
> dashboard exposes an offline indicator, and the provider layer coordinates queued work
> and synchronization behavior. This is especially useful for field-service workflows
> where connectivity may be intermittent.

References:

- Offline indicator:
  [`src/components/dashboard/offline-indicator.tsx`](./src/components/dashboard/offline-indicator.tsx)
- Offline provider:
  [`src/providers/offline.provider.tsx`](./src/providers/offline.provider.tsx)
- Offline fetch layer:
  [`src/lib/offline/fetch.ts`](./src/lib/offline/fetch.ts)

## 7:25–8:00 — Closing summary

**On screen:** Return to the admin overview or the public homepage and show the app logo.

**Narration:**

> To summarize, Field Nexus combines a public marketing experience with authenticated
> role-specific dashboards. The Next.js App Router keeps layouts and page composition
> server-friendly, while focused client components handle interaction, authentication
> state, query caching, forms, and dialogs. Role guards protect routes and dynamic
> navigation keeps each workflow focused. Suspense skeletons make data loading feel
> intentional, Zod validation prevents invalid submissions, and explicit error states and
> toasts keep failures understandable. Finally, the responsive shell and offline-aware
> behavior make the product practical for both office users and technicians working in
> the field.

**End card:** “Field Nexus — connecting service requests to reliable field operations.”

## Quick recovery checklist

- If a quick-login button is missing, verify the corresponding `NEXT_PUBLIC_QUICK_LOGIN_*`
  variables are configured and restart the dev server.
- If a role redirects to login, verify the API URL, backend availability, and session
  cookies.
- If data does not load, restore DevTools network mode to **Online**, refresh, and retry.
- If the skeleton is too brief to capture, throttle to Slow 3G before reloading.
- Never record real credentials, access tokens, cookies, or private customer data.

---

# Field Nexus — ৫ মিনিটের বাংলা ভিডিও স্ক্রিপ্ট

**ভাষা:** বাংলা  
**লক্ষ্য সময়:** প্রায় ৫ মিনিট  
**ডেমো:** শুধুমাত্র seeded demo account ব্যবহার করুন; password, token বা `.env.local`-এর
তথ্য রেকর্ড করবেন না।

## সময়সূচি

| সময় | অংশ |
| --- | --- |
| 0:00–0:40 | প্রজেক্ট ও UI/UX পরিচিতি |
| 0:40–1:20 | Next.js architecture |
| 1:20–2:20 | Customer quick login |
| 2:20–3:15 | Admin role ও protected route |
| 3:15–4:20 | API, loading, caching ও validation |
| 4:20–5:00 | Error handling, responsive design ও সমাপ্তি |

## 0:00–0:40 — প্রজেক্ট ও UI/UX পরিচিতি

**স্ক্রিনে:** Field Nexus-এর landing page খুলে hero section, features, roles এবং
call-to-action দেখান।

**বলার স্ক্রিপ্ট:**

> Field Nexus একটি service-management platform। এখানে customer service request তৈরি
> করতে পারে, booking ও payment track করতে পারে এবং feedback দিতে পারে। Technician
> assigned work order পরিচালনা করতে পারে, service report জমা দিতে পারে এবং payment
> দেখতে পারে। Admin users, vendors, technicians, work orders, payments এবং audit logs
> পরিচালনা করতে পারে।
>
> UI/UX-এর মূল লক্ষ্য হলো প্রতিটি role-কে তার প্রয়োজনীয় কাজগুলো সহজে দেখানো। তাই
> পরিষ্কার sidebar navigation, dashboard cards, consistent tables, status badge,
> accessible controls এবং responsive layout ব্যবহার করা হয়েছে। ফলে অপ্রয়োজনীয়
> navigation কমে এবং field-service workflow দ্রুত সম্পন্ন করা যায়।

**দেখাতে পারেন:**

- [`src/app/(public)/(marketing)/page.tsx`](./src/app/(public)/(marketing)/page.tsx)
- [`src/components/dashboard/dashboard-shell.tsx`](./src/components/dashboard/dashboard-shell.tsx)

## 0:40–1:20 — Next.js architecture

**স্ক্রিনে:** Code editor-এ root layout, dashboard layout এবং role guard দেখান।

**বলার স্ক্রিপ্ট:**

> এটি Next.js App Router ভিত্তিক application। Root layout
> [`src/app/layout.tsx`](./src/app/layout.tsx)-এ metadata, fonts, global stylesheet,
> theme provider, query provider এবং toast system সেট করা হয়েছে।
>
> App Router-এর page এবং layout component-গুলো default হিসেবে Server Component। যেমন
> admin page-এর structure server-side তৈরি হয়। অন্যদিকে login form, sidebar, role
> guard এবং data table-গুলো Client Component, কারণ সেখানে browser state, click event,
> navigation এবং TanStack Query ব্যবহার করা হয়েছে।
>
> Dashboard layout প্রথমে authentication check করে। এরপর customer বা admin layout
> আলাদা role guard ব্যবহার করে। অর্থাৎ শুধু menu লুকানো নয়, protected route-ও
> authorization অনুযায়ী নিয়ন্ত্রিত হয়।

**কোড রেফারেন্স:**

- [`src/app/(dashboard)/layout.tsx`](./src/app/(dashboard)/layout.tsx)
- [`src/components/auth/auth-guard.tsx`](./src/components/auth/auth-guard.tsx)
- [`src/components/auth/role-guard.tsx`](./src/components/auth/role-guard.tsx)

**Loading note:**

> এই repository-তে route-level `loading.tsx` নেই। পরিবর্তে feature-level `Suspense`
> fallback এবং skeleton component ব্যবহার করা হয়েছে। Admin overview-তে API response
> আসার আগে এই loading skeleton দেখা যাবে।

## 1:20–2:20 — Customer quick login

**স্ক্রিনে:** `/login` খুলে **Customer** quick-login button চাপুন।

**বলার স্ক্রিপ্ট ও action:**

> এখন One-Click Demo Login ব্যবহার করে Customer হিসেবে login করছি। Quick-login profile
> configuration থেকে button তৈরি হয়, তাই সাধারণ login flow-ও একই থাকে।

1. Customer button চাপুন এবং dashboard load হওয়া পর্যন্ত অপেক্ষা করুন।
2. Sidebar-এ **Overview**, **Book a Service**, **Bookings**, **Payment History** এবং
   **My Profile** দেখান।
3. **Book a Service** page খুলে form-এর layout দেখান।

> এটি customer-specific navigation। এখানে service booking, booking status, payment
> history এবং profile-এর মতো প্রয়োজনীয় feature আছে, কিন্তু admin controls নেই।
> Shared dashboard shell-এর কারণে header, breadcrumb, notification, theme toggle,
> offline indicator এবং profile menu সব role-এই consistent থাকে।

**রেফারেন্স:**

- [`src/app/(dashboard)/customer/layout.tsx`](./src/app/(dashboard)/customer/layout.tsx)
- [`src/app/(dashboard)/customer/create-booking/page.tsx`](./src/app/(dashboard)/customer/create-booking/page.tsx)
- [`src/lib/quick-login.ts`](./src/lib/quick-login.ts)

## 2:20–3:15 — Admin role ও protected route

**স্ক্রিনে:** Profile menu থেকে logout করে আবার login page-এ যান। এবার **Admin** চাপুন।

**বলার স্ক্রিপ্ট ও action:**

> এবার logout করে Admin হিসেবে login করছি। এখানে role পরিবর্তনের সঙ্গে শুধু dashboard
> title নয়, পুরো navigation এবং accessible feature পরিবর্তিত হচ্ছে।

1. Admin overview-এর metrics দেখান।
2. Sidebar-এ **Users**, **Technician Approval**, **Vendors**, **Work Orders**,
   **Payments**, **Service Categories** এবং **Audit Logs** দেখান।
3. Users page খুলে table দেখান।

> Admin layout `ADMIN` এবং `SUPER_ADMIN` role গ্রহণ করে, আর customer layout শুধু
> `CUSTOMER` role গ্রহণ করে। Authenticated user-এর role API থেকে পাওয়া হয় এবং sidebar
> সেই role অনুযায়ী route তৈরি করে। Unauthorized user হলে access-denied state দেখা যায়,
> আর login না করা user login page-এ redirect হয়।

## 3:15–4:20 — API, loading, caching ও validation

**স্ক্রিনে:** Admin Overview বা Users page-এ DevTools → Network খুলুন।

**বলার স্ক্রিপ্ট ও action:**

> এখন data-heavy page-এর loading এবং API integration দেখাচ্ছি। Network throttling
> করে page reload করলে প্রথমে skeleton card বা table row দেখা যায়। API response
> আসার পরে একই layout-এর মধ্যে real data বসে যায়।

1. DevTools-এ **Slow 3G** নির্বাচন করে page reload করুন।
2. Skeleton loading state দেখান।
3. Normal network ফিরিয়ে populated data দেখান।
4. Network request-এ endpoint, status এবং response timing দেখান।

> TanStack Query query key এবং cache ব্যবহার করে। Query provider-এ stale time এক মিনিট
> রাখা হয়েছে। Admin hooks-এ dashboard stats এবং users-এর জন্য stable query key আছে,
> তাই একই data অপ্রয়োজনীয়ভাবে বারবার fetch না করে cache reuse করা যায়।

**রেফারেন্স:**

- [`src/providers/query.provider.tsx`](./src/providers/query.provider.tsx)
- [`src/hooks/admin.hook.ts`](./src/hooks/admin.hook.ts)
- [`src/components/modules/admin/admin-users-table-loading.tsx`](./src/components/modules/admin/admin-users-table-loading.tsx)

**Validation দেখান:**

> এবার একটি form-এ ভুল data দিচ্ছি। Login form-এ invalid email এবং ছোট password দিয়ে
> submit করলে API call হওয়ার আগেই Zod validation message দেখা যায়। Required title,
> invalid email বা password policy-এর মতো error field-এর নিচেই দেখানো হয়।

**রেফারেন্স:**

- [`src/validation/auth.validation.ts`](./src/validation/auth.validation.ts)
- [`src/components/form/login-form.tsx`](./src/components/form/login-form.tsx)

## 4:20–5:00 — Error handling, responsive design ও সমাপ্তি

**স্ক্রিনে:** Network offline করে data page reload করুন, তারপর mobile device mode চালু
করুন।

**বলার স্ক্রিপ্ট ও action:**

> এখন network offline করে API error দেখাচ্ছি। Application empty বা fake data দেখায় না;
> পরিবর্তে পরিষ্কার error message এবং **Try again** button দেখায়। Network ফিরিয়ে
> button চাপলে page আবার request করে।

1. DevTools → Network থেকে **Offline** নির্বাচন করুন।
2. Admin Users বা Overview reload করে error state দেখান।
3. Network **Online** করে **Try again** চাপুন।
4. Device toolbar-এ mobile width নির্বাচন করে sidebar, form এবং table দেখান।

> Responsive layout-এ mobile screen-এ navigation compact হয়, form touch-friendly থাকে
> এবং table content প্রয়োজন অনুযায়ী scroll বা reflow করে। Dashboard-এ offline
> indicator-ও আছে, যা field-service environment-এর intermittent connectivity-এর জন্য
> গুরুত্বপূর্ণ।
>
> সংক্ষেপে, Field Nexus একটি role-based, responsive এবং API-driven service platform।
> Next.js App Router architecture, protected route, TanStack Query caching, Zod
> validation, explicit error state এবং offline-aware UX একসঙ্গে ব্যবহার করে এটি
> customer, technician এবং admin workflow-কে একটি unified experience-এ আনে।

**শেষ স্ক্রিন:**  
“Field Nexus — connecting service requests to reliable field operations.”
