# Field Nexus — Project Guidelines and User Manual

**How to use the Field Nexus website, from your very first visit to completing and paying for a job.**

This manual is for **end users** — customers, technicians, and administrators — who use Field Nexus in a web browser. You do not need any technical knowledge. Just follow the steps below.

> **Documentation map:** Use [USER_MANUAL.md](USER_MANUAL.md) for the expanded end-user handbook. This file combines the core user instructions with project-level behavior and maintenance rules that should remain consistent when the product changes.

> **Live website:** **https://fieldnexus-frontend.vercel.app**
> Open this link in Chrome, Firefox, Edge, or Safari on your computer, tablet, or phone.

---

## Table of Contents

1. [What Is Field Nexus?](#1-what-is-field-nexus)
2. [The Four Types of Users](#2-the-four-types-of-users)
3. [Your First Visit — The Public Website](#3-your-first-visit--the-public-website)
4. [Create Your Account](#4-create-your-account)
5. [Log In](#5-log-in)
6. [Forgot Your Password?](#6-forgot-your-password)
7. [Join as a Technician (Application)](#7-join-as-a-technician-application)
8. [How a Job Moves Through the System](#8-how-a-job-moves-through-the-system)
9. [Using the Dashboard (Same for Everyone)](#9-using-the-dashboard-same-for-everyone)
10. [Customer Guide — Book and Pay for a Service](#10-customer-guide--book-and-pay-for-a-service)
11. [Technician Guide — Accept and Complete Jobs](#11-technician-guide--accept-and-complete-jobs)
12. [Admin Guide — Run the Platform](#12-admin-guide--run-the-platform)
13. [Super Admin Guide — Manage Admins](#13-super-admin-guide--manage-admins)
14. [Your Profile & Notifications](#14-your-profile--notifications)
15. [Words and Statuses Explained](#15-words-and-statuses-explained)
16. [Tips for a Smooth Experience](#16-tips-for-a-smooth-experience)
17. [Something Not Working? — Troubleshooting](#17-something-not-working--troubleshooting)
18. [Frequently Asked Questions](#18-frequently-asked-questions)
19. [Need Help?](#19-need-help)
20. [Project Behavior and Maintenance Guidelines](#20-project-behavior-and-maintenance-guidelines)

---

## 1. What Is Field Nexus?

**Field Nexus** is a website for arranging and managing **field services** — jobs done at your home, office, or any location by a visiting technician.

It connects three parties in one place:

- **Customers** who need something fixed or installed
- **Vendor companies** and their **technicians** who do the work
- **Admins** from Field Nexus who approve requests and assign the right team

Instead of phoning around and chasing updates, everything happens on one website: you request a job, watch it move through each stage, get it done, pay by **bKash**, and rate the service — with a receipt emailed to you.

---

## 2. The Four Types of Users

When you register and log in, you get a **dashboard that matches your role**. You only ever see your own menus and your own data.

| Who | What They Do on the Site | Their Dashboard |
|-----|--------------------------|-----------------|
| **Customer** | Books services, tracks the job, pays by bKash, rates the work | `/customer` |
| **Technician** | Accepts assigned jobs, updates the job status, submits service reports, views earnings | `/technician` |
| **Admin** | Approves requests, assigns technicians, manages users/vendors/payments, reviews logs | `/admin` |
| **Super Admin** | Creates and manages Admin accounts | `/admin/admins` |

> **Note:** Vendors (technician companies) are managed by admins on the platform. Regular customers sign up themselves; technicians join by applying (see [Section 7](#7-join-as-a-technician-application)).

---

## 3. Your First Visit — The Public Website

Go to **https://fieldnexus-frontend.vercel.app** in your browser. The public site opens — **no account needed**.

### The top menu (header)

| Button / Link | Where It Takes You |
|---------------|--------------------|
| **Logo / Home** | The home page |
| **About us** | The company story and how the platform works |
| **Vendors** | The public vendor directory |
| **Contact** | A form to message the Field Nexus team |
| **Login** | The sign-in page |
| **Get started** | The registration page |

On a phone, these links are inside the **menu button** (☰).

### The home page — what you'll see

Scrolling down the home page you'll find:

1. **Hero** — what Field Nexus is, with buttons to start
2. **How it works** — the four steps of a job: *request → admin approval → technician does the work → payment*
3. **Verified network** — real service categories and approved vendor teams
4. **Capabilities** — features like the vendor directory, status tracking, ratings, and notifications
5. **Who it's for** — what each of the four roles can do
6. **Testimonials** — what users say
7. **FAQ** — click any question to expand the answer
8. **Final call to action** — create your account or join as a technician

### The footer

Three groups of links:
- **Platform** — Overview, How it works, Browse vendors, About us
- **Account** — Sign in, Create account, Apply as a technician, Forgot password
- **Legal** — Terms of service, Privacy policy, Security

### Browse the vendor directory (no login needed)

1. Click **Vendors** in the top menu (or "Browse vendors" on the home page).
2. Use the **search box** to find a vendor by name or email — results update as you type.
3. **Click a vendor card** to open their profile and see details about the company.
4. Use the **pagination** at the bottom to move through pages.

> Only **approved** vendors appear here — every listing has been reviewed by the Field Nexus team.

### Send a message to the team

1. Click **Contact** in the top menu.
2. Fill in **Name**, **Email**, **Subject**, and **Message**.
3. Submit — your message goes straight to the admin team's dashboard, and they can reply to your email.

---

## 4. Create Your Account

1. Click **Get started** in the top menu (or go to the registration page).
2. Fill in the form:

   | Field | What to Enter |
   |-------|---------------|
   | **Name** | Your full name |
   | **Email** | A real email address — your verification code goes here |
   | **Contact Number** | Your phone number |
   | **Password** | Choose a password |
   | **Confirm Password** | Type the same password again |

3. Submit the form.
4. **Check your email.** You'll receive a message with a **6-digit code (OTP)**.
5. Enter the code on the verification screen to verify your account.
   - No email? Look in your **spam/junk** folder.
   - Code expired? Click **Resend OTP** to get a new one.
6. Once verified, your account is ready — you can log in.

---

## 5. Log In

1. Click **Login** (top menu) or **Sign in** (footer).
2. Choose one way to sign in:

   **Option A — Email and password**
   - Enter your email and password (tap the 👁 icon to check what you typed).
   - Click **Login**.

   **Option B — Google**
   - Click **Continue with Google** and pick your Google account.
   - (This button only appears if Google sign-in is enabled.)

   **Option C — Quick-login buttons (demo only)**
   - Some sites show one-click role buttons that sign you into a test account. These are for demonstrations only.

3. After logging in you land on **your dashboard** automatically.

**To log out:** click your **avatar picture** in the top-right corner → **Logout**.

> Your login is stored securely in your browser session. If the site asks you to log in again later, that's normal — just sign in once more.

---

## 6. Forgot Your Password?

1. On the login page, click the **forgot password** link (or open `/forgot-password`).
2. Enter your **registered email** and submit.
3. You'll receive a **6-digit code** by email — enter it on the next screen.
   - Didn't get it? Click **Resend**.
4. On the reset screen, type your **new password** twice.
5. Save, then log in with your new password.

---

## 7. Join as a Technician (Application)

Want to work as a technician? You **don't need an account first**:

1. On the site, click **Join as a technician** (home page) or **Apply as a technician** (footer), which opens the application form.
2. Fill in your details:

   | Field | What to Enter |
   |-------|---------------|
   | **Name** | Your full name |
   | **Email** | Used to check your application status later |
   | **Contact Number** | Your phone number |
   | **Address** | Where you are based |
   | **Qualifications** | Your formal qualifications |
   | **Experience (years)** | Years of experience |
   | **Skills** | Your skills |
   | **Resume** | Upload your CV (required) |
   | **Additional documents** | Optional extra files |
   | **Bio** | A short description about you |

3. Submit the application.
4. **Track your status anytime:** go to the **application status** page and enter your email — no login required. Your application will show as *Pending* until an admin reviews it.
5. When **approved**, you can log in and start receiving job assignments.

---

## 8. How a Job Moves Through the System

Every job on Field Nexus is a **work order**, numbered like `WO-20261009-0001`. Here's the journey from start to finish — and **who does what** at each step:

```
PENDING → APPROVED → ASSIGNED → ACCEPTED → EN_ROUTE → IN_PROGRESS → COMPLETED
   └─────────────────────────────┴──────────────┴──→ CANCELLED | REASSIGNED | FAILED
```

| Step | Status | What Happens | Who Does It |
|------|--------|--------------|-------------|
| 1 | **Pending** | The job request is submitted and waits for review | Customer |
| 2 | **Approved** | The request is accepted | Admin |
| 3 | **Assigned** | A vendor company and one of its technicians are chosen | Admin |
| 4 | **Accepted** | The technician agrees to take the job (if they decline, it goes back to the admin) | Technician |
| 5 | **En route** | The technician is traveling to the location | Technician |
| 6 | **In progress** | The work has started | Technician |
| 7 | **Completed** | The work is finished and a service report is submitted | Technician |
| 8 | **Payment** | The customer pays by bKash and gets a receipt by email | Customer |
| 9 | **Feedback** | The customer rates the job and leaves a comment | Customer |

An admin can also **cancel**, **reassign**, or mark a job **failed** if needed.

**You don't need to phone anyone for updates** — everyone involved gets an in-app notification the moment a status changes, and the job's current status is always visible on its details page.

---

## 9. Using the Dashboard (Same for Everyone)

Every dashboard looks and works the same way, so once you learn one you know them all.

### Left sidebar (menu)
- Links are grouped (for example *Bookings*, *Technician*, *Administration*).
- You only see the groups belonging to **your role**.
- The page you're currently on is highlighted.

### Top-right corner
- **Bell icon 🔔** — your notifications, with a badge showing how many are unread.
- **Avatar** — click for your profile and the **Logout** button.

### Lists and tables (bookings, users, payments…)
- **Search box** — type to filter the list instantly.
- **Tabs** — switch between views (for example *All / Active / Completed*).
- **Column headers** — click to sort.
- **Pagination** — move between pages.
- While data loads you'll see grey placeholder bars (skeletons) — the page isn't broken, it's just fetching.

### Buttons and dialogs
- Actions open **dialogs/modals** — read the message carefully, confirm, and you'll see a green success toast.
- If something goes wrong, a red toast explains the reason.

---

## 10. Customer Guide — Book and Pay for a Service

Log in as a customer — your dashboard is the **Customer** area with these menu items: *Overview, Create Booking, View Bookings, Payment History,* and *My Profile*.

### 10.1 Overview (dashboard home)

Your at-a-glance summary:

- **Stat cards:** Total Paid · Amount Due · Refunded · Transactions
- **Charts:** Spending over time · Payments by status
- **Recent Payments** list
- **Outstanding Balance** — what you still owe
- **Quick Actions** — one-click links to Payment History, My Profile, and Edit Profile

### 10.2 Create a booking (request a service)

1. In the sidebar, click **Create Booking**.
2. Fill in the form:

   | Field | What to Enter | Example |
   |-------|---------------|---------|
   | **Title** | Short summary of the problem | *"Air conditioner not cooling"* |
   | **Service Category** | Choose the service type from the dropdown | *HVAC* |
   | **Priority** | Low, Medium, High, or Urgent | *High* |
   | **Scheduled At** | Your preferred date and time | *12 Oct 2026, 10:00* |
   | **Description** | Anything the technician should know | *"3rd floor, no lift. Call before arriving."* |

3. Submit. Your job is created with status **Pending** and appears in your bookings list.
4. From now on, you'll get a **notification** at every step (approved, assigned, in progress, completed…).

### 10.3 Track your bookings

1. Click **View Bookings** in the sidebar.
2. Find your job using **search**, **tabs**, or **pagination**.
3. **Click the job** to open its details page, which shows:
   - Job number, status, priority, and deadline
   - The description of the work
   - The assigned **vendor and technician** (once assigned)
   - The **service report** after the job is done (what was found, parts used, hours worked)
   - Your **feedback** (once you've given it)
   - The **timeline** of every status change

### 10.4 Pay with bKash (only after the job is Completed)

1. Open the completed job.
2. Click **Pay Now**.
3. You're taken to the official **bKash payment page** — pay there as usual.
4. You're returned to Field Nexus automatically; the payment is recorded.
5. A **receipt is emailed to you**, and the payment appears in your payment history with its bKash IDs.

> The **Pay Now** button only appears when a job is *Completed*. If the bKash page doesn't open, disable your pop-up blocker and try again.

### 10.5 Give feedback

After the job is complete, a **Feedback** button appears:

1. Click it and give a **1–5 star rating**.
2. Optionally write a comment.
3. Submit. (You can only give feedback once per job — afterwards you'll see your existing rating.)

### 10.6 Payment history

1. Click **Payment History** in the sidebar.
2. See every payment and refund with a status badge (*Paid, Unpaid, Failed, Cancelled, Refunded*).
3. **Click a row** for full details: amount, bKash Payment ID, bKash Transaction ID, and — if refunded — the refund amount, transaction ID, date, and reason.

---

## 11. Technician Guide — Accept and Complete Jobs

Log in as a technician — your dashboard is the **Technician** area: *Overview, My Work Orders, Payments,* and *My Profile*.

### 11.1 Overview

- **Stat cards:** Assigned Jobs · Awaiting Response · In Progress · Urgent Jobs
- **Charts:** Jobs by status · Priority mix
- **Your Schedule** — your next scheduled job
- Work lists: **Needs your response**, **Active jobs**, **Completed**
- **Deadline labels** appear next to jobs, e.g. *"3h left"* or *"Overdue by 5h"*

### 11.2 Find your jobs

1. Click **My Work Orders** in the sidebar.
2. Use the tabs: **All · Active · Completed · Closed**, plus search.
3. **Click a job** to see its full details (customer info, description, timeline).

### 11.3 Work through a job (the buttons you'll use)

The buttons change depending on the job's status — you move the job forward one step at a time:

| When the job is… | Click | Result |
|------------------|-------|--------|
| **Assigned** to you | **Accept** or **Reject** | Accept → job becomes *Accepted*. Reject → goes back to the admin to find someone else. |
| **Accepted** | **En Route** | You're heading to the location |
| **En Route** | **In Progress** | You've started working |
| **In Progress** | **Complete** (opens the service report form) | Fill it in and submit → job becomes *Completed* |

### 11.4 Submit the service report

When you finish the work, the completion form asks for:

- **Issue found / description** — what was wrong and what you did
- **Parts used** — any parts you installed
- **Hours worked** — your labor time

Submit it — the report becomes part of the job record (visible to admins and the customer) and unlocks the customer's payment.

### 11.5 Payments (your earnings)

Click **Payments** in the sidebar to see a read-only list of payments made for your completed jobs. Click any row for details.

---

## 12. Admin Guide — Run the Platform

Log in as an admin — your dashboard is the **Admin** area with two menu groups:

**Administration:** Overview · Users · Technician Approval · Vendors · Work Orders · Payments · Service Categories
**Monitoring:** Contact Messages · Audit Logs

### 12.1 Overview

Your control tower:
- **Stat cards:** Total Revenue · Work Orders · SLA Compliance (percentage of jobs finished on time) · Total Users
- **Charts:** Vendors by status · Work orders by status · Service health · People counts
- **Quick Actions** — jump straight to Users, Vendors, Audit Logs, and more

### 12.2 Users

1. Click **Users**.
2. Switch between **role tabs** (All / Customers / Technicians) and **status tabs** (All / Active / Blocked / Deleted).
3. **Search** by name or email, click column headers to **sort**, move between **pages**.
4. On any row you can:
   - **View** — open the full user profile
   - **Block / Unblock** — blocked users cannot log in
   - **Delete** — hides the account (it can be restored later)
   - **Restore** — brings a deleted account back
5. **Bulk actions:** tick several checkboxes, then block or delete them all at once (you'll be asked to confirm).

### 12.3 Technician Approval

1. Click **Technician Approval**.
2. Open a pending application to review the candidate's details and **resume**.
3. Click **Approve** (they can now log in and get jobs) or **Reject**.

### 12.4 Vendors

1. Click **Vendors**.
2. Use the tabs and search to find a company.
3. Available actions:
   - **Create Vendor** — add a new company (modal form)
   - **Edit** — update company information
   - **Change status** — approve or suspend a vendor (shown as badges everywhere)
   - **Performance analytics** — a scorecard of completed jobs, SLA breaches, and average completion time
   - **Delete / Restore** — soft delete and bring back
4. **Teams:** open a vendor's **members** page to **add**, **remove**, or **restore** technician members.

### 12.5 Work Orders (the most-used page)

1. Click **Work Orders**.
2. Filter with:
   - Tabs (**All / Deleted**)
   - **Status** dropdown (Pending, Approved, Assigned, … )
   - **Priority** dropdown (Low / Medium / High / Urgent)
   - **Search** box
3. **Click a job** to open its details: overview, customer, assignments, service report, feedback, and full timeline.
4. Actions:
   - **Assign:** choose a **vendor** first, then a **technician** from that vendor's team → status becomes *Assigned*.
   - **Update status:** move the job forward, **cancel**, **reassign**, or mark **failed**.
   - **Create:** raise a work order on behalf of a customer.
   - **Delete:** soft delete (recoverable from the Deleted tab).

> If two people change the same job at the same time, the site warns you that the record was updated by someone else — just reopen it and try again. Nothing gets overwritten by accident.

### 12.6 Payments and refunds

1. Click **Payments**.
2. Switch tabs: **All · Paid · Unpaid · Failed · Cancelled · Refunded**.
3. Click a payment to see its details.
4. To **refund:** open a *Paid* payment → click **Refund** → the dialog shows exactly how much will be returned and how → confirm. The payment then shows the refund amount, transaction ID, and date.

### 12.7 Service Categories

Click **Service Categories** to manage the categories customers pick from when booking:
- **Create** a new category (modal form)
- **Edit** or **delete** existing ones (deleted categories can be restored)

### 12.8 Contact Messages

Click **Contact Messages** to read messages sent through the public Contact page:
- Open a message to read it in full
- **Mark as read** when you've handled it

### 12.9 Audit Logs

Click **Audit Logs** to see a record of **who did what and when**:
- Filter by **action** (created, updated, deleted…) and **entity** (user, vendor, work order, payment…)
- Use search and pagination to find a specific event
- Useful for settling disputes: *"Who changed this job's status?"*

---

## 13. Super Admin Guide — Manage Admins

Logging in as a Super Admin shows the entire admin dashboard **plus** one extra menu item: **Admins**.

On the **Admins** page (`/admin/admins`) you can:

| Action | How |
|--------|-----|
| **Create an admin** | Open the create form (popover), fill in the details, confirm |
| **Block / Unblock** | Row buttons — blocked admins can't log in |
| **Reset an admin's password** | Open the reset form (popover) and set a new password |
| **Change an admin's email** | Open the change-email form (popover) and save the new address |
| **Delete / Restore** | Remove an admin account and bring it back later |

Search, tabs (including deleted), sorting, and pagination work the same as on every other page.

---

## 14. Your Profile & Notifications

### My Profile (all roles)

1. In the sidebar, open **Account → My Profile** (or use *My Profile* on the overview page).
2. View your stored account details.
3. Click **Edit** (→ `/profile/edit`) to change your information, including uploading a **profile picture**.

### Notifications (all roles)

1. Click the **bell icon 🔔** in the top-right corner.
2. The badge shows how many **unread** notifications you have — new assignments, status changes, approvals, payments.
3. **Click a notification** to jump straight to the related job or record.
4. Use **Mark as read** per item, or **Mark all as read** to clear the badge.

> You'll never miss an update: everyone involved in a job is notified the moment its status changes.

---

## 15. Words and Statuses Explained

### Job (work order) statuses

| Status | Plain meaning |
|--------|---------------|
| **Pending** | Requested — waiting for admin approval |
| **Approved** | Approved — waiting to be assigned to a team |
| **Assigned** | A vendor and technician were chosen — waiting for the technician to accept |
| **Accepted** | The technician said yes |
| **En route** | The technician is on the way |
| **In progress** | The work has started |
| **Completed** | Finished — ready for payment |
| **Cancelled** | Called off |
| **Reassigned** | Sent back to be given to a different technician |
| **Failed** | The job could not be completed |

### Payment statuses

| Status | Meaning |
|--------|---------|
| **Paid** | Payment completed |
| **Unpaid** | Job done but not paid yet |
| **Failed** | The bKash payment didn't go through |
| **Cancelled** | The payment attempt was cancelled |
| **Refunded** | Money was returned to the customer |

### Priorities

**Low · Medium · High · Urgent** — every job gets a deadline based on its priority. Urgent jobs are flagged on dashboards so they're handled first.

### Quick glossary

- **Work order** — one job, numbered like `WO-20261009-0001`
- **Vendor** — a company that employs technicians (shown in the public directory once approved)
- **Service report** — the technician's record of the work: issue found, parts used, hours worked
- **OTP** — the 6-digit code emailed to you for verification or password reset
- **bKash** — the mobile payment service used to pay and get refunds
- **SLA** — the deadline by which a job should be finished
- **Audit log** — the platform's record of every important action

---

## 16. Tips for a Smooth Experience

- Use an up-to-date browser — the site works on computers, tablets, and phones.
- If a page seems stuck, **refresh** it (`F5` on Windows, `Cmd+R` on Mac).
- **Submit forms before navigating away** — half-finished forms aren't saved.
- Keep an eye on the **bell icon** — that's where updates arrive.
- Use the **search box** in lists; results update as you type.
- Customers: write a good **description** when booking — the technician arrives prepared.
- Technicians: clear your *"Awaiting Response"* jobs quickly so work isn't delayed.
- Admins: check **SLA Compliance** and **Audit Logs** regularly.
- **Log out** when you're finished, especially on shared computers.

---

## 17. Something Not Working? — Troubleshooting

| Problem | What To Do |
|---------|------------|
| **Never received the 6-digit code (OTP)** | Check your spam/junk folder, wait a minute, then click **Resend OTP**. Make sure you typed the correct email address. |
| **"Invalid OTP" error** | Codes expire — request a new one and enter it quickly. |
| **Can't log in** | Use the **forgot password** flow to reset your password ([Section 6](#6-forgot-your-password)). |
| **Google sign-in button not visible** | Google sign-in isn't enabled on this site — use your email and password. |
| **"Access denied" page** | You're logged in as the wrong role. Log out and log in with the correct account. |
| **Logged out unexpectedly** | Sessions expire — simply log in again. |
| **"Record was updated by someone else"** | Someone changed that same record first. Reopen it to see the latest info, then repeat your action. |
| **bKash page doesn't open** | Disable your pop-up blocker for this site, then click **Pay Now** again. |
| **Payment didn't complete** | Check your bKash balance and limits, then try again — the job stays *Unpaid* until it succeeds. |
| **A job you expect is missing** | Jobs are only visible to the people involved: customers see *their* bookings, technicians see *their* assigned jobs, admins see everything. |
| **Resume upload fails** | Check the file format and size limit shown on the form, then try again. |
| **A page keeps loading** | Refresh the page; if it continues, log out and log back in. |
| **Something looks broken** | Note the page address and what you clicked, then [contact the team](#19-need-help). |

---

## 18. Frequently Asked Questions

**Who can use Field Nexus?**
Four roles work together: customers raise and pay for service requests, technicians travel and complete the jobs, vendor companies manage their technician teams, and admins approve requests, assign work, and audit everything.

**How does a service request move through the system?**
A customer creates a work order with a category, priority, and schedule. It stays pending until an admin approves it and assigns a vendor plus one of their technicians. The technician then accepts, works through the job, and submits a service report with parts and hours.

**How do technicians get assigned to a job?**
Admins assign the vendor first, then pick a technician from that vendor's team. Technicians only see jobs routed to them, so no two teams can claim the same job. A technician who can't attend declines, and the order returns to the admin queue.

**How does payment work?**
Once a work order is complete, the customer pays through bKash. The payment is recorded against the order, appears in the customer's payment history and the technician's earnings, and a receipt is emailed to the customer.

**Can I track my booking?**
Yes. Every work order shows its current status from pending through completion, and everyone involved is notified at every change.

**How are technicians and vendors verified?**
Technicians apply through the site and stay pending until an admin approves them. The public vendor directory only lists companies that have cleared verification.

**What does it cost to get started?**
Creating a customer account is free, and you can raise a service request in under a minute.

**What can admins see?**
Every work order, vendor and team records, technician approvals, payments and refunds, contact messages, and a full audit log — plus per-vendor performance scorecards.

**Can I use the site on my phone?**
Yes — every page and dashboard is fully responsive.

---

## 19. Need Help?

| Need | What to Do |
|------|------------|
| General question | Open the **Contact** page on the site and send a message — the team sees it immediately |
| Technician application status | Open the **application status** page and enter the email you applied with |
| Password problems | Use the **forgot password** flow on the login page |
| Terms, privacy, security | Footer links: *Terms of service · Privacy policy · Security* |
| Live website | **https://fieldnexus-frontend.vercel.app** |

---

*This manual describes the Field Nexus website as it runs in production. If a feature changes, update the matching section here so instructions stay accurate.*

---

## 20. Project Behavior and Maintenance Guidelines

This section is for maintainers, developers, and anyone extending Field Nexus. It records the product rules that must be preserved when changing the frontend.

### 20.1 Source-of-truth documents

Keep these documents aligned:

| Document | Purpose |
| --- | --- |
| [USER_MANUAL.md](USER_MANUAL.md) | Expanded end-user instructions and role workflows |
| [PROJECT_GUIDELINES.md](PROJECT_GUIDELINES.md) | Core user guide plus product behavior and maintenance rules |
| [README.md](README.md) | Frontend setup, architecture, scripts, deployment, and technical overview |
| [API_INTEGRATION.md](API_INTEGRATION.md) | Frontend-to-backend endpoint and payload mapping |
| `backend-l2b7-assignment-06/GUIDELINE.md` | Backend workflow, role permissions, status rules, and API testing order |
| `backend-l2b7-assignment-06/API_INTEGRATION.md` | Backend-owned API integration reference |

When a screen, route, label, permission, status transition, or payment rule changes, update the relevant documentation in the same change.

### 20.2 Frontend architecture rules

- Use the Next.js App Router structure under `src/app`.
- Keep public pages, authenticated dashboard layouts, and role-specific pages separated by route groups.
- Reuse existing components under `src/components` before creating a new pattern.
- Put backend request functions in `src/api`, reusable server-state logic in `src/hooks`, and shared types in `src/types`.
- Put form schemas in `src/validation` and use the existing TanStack Form plus Zod pattern.
- Use the shared `apiClient`; do not create one-off fetch clients for individual screens.
- Preserve `credentials: "include"` behavior because authentication uses an httpOnly cookie session.
- Use the existing toast and error helpers for visible success and failure feedback.
- Keep loading, empty, error, and unauthorized states explicit. Do not silently render success-shaped fallback data.

### 20.3 Role and permission rules

The frontend must never imply that a user can perform an action that the backend will reject.

- Customers can manage only their own bookings, feedback, and payments.
- Technicians can manage only assigned work orders and their own service reports.
- Admins manage operational records, vendors, technician applications, payments, categories, messages, and audit views.
- Super Admins inherit Admin access and additionally manage administrator accounts.
- Vendor records are administered by Admins; the current frontend does not expose a separate vendor login dashboard.
- Route guards and backend authorization are both required. A hidden button is not a replacement for backend authorization.

### 20.4 Work-order lifecycle rules

Preserve the normal sequence:

```text
PENDING -> APPROVED -> ASSIGNED -> ACCEPTED -> EN_ROUTE
         -> IN_PROGRESS -> COMPLETED
```

The alternate outcomes are `CANCELLED`, `REASSIGNED`, and `FAILED`.

- Customers can cancel only eligible early-stage bookings.
- Technicians must accept an assignment before progressing it.
- Technicians must submit a service report before completion is available.
- Customers can provide feedback only after completion.
- Customers can initiate payment only for eligible completed work.
- Admins should assign only approved, active vendors and available technicians.
- Status actions must send the current work-order `version` to preserve optimistic locking.
- A conflict response means the record must be refetched before retrying.

### 20.5 API and data-handling rules

- Treat the API response envelope as `{ success, statusCode, message, data, meta? }`.
- Reuse typed API payloads and response types; avoid untyped casts.
- Show the backend error message through `getApiErrorMessage` when available.
- Do not log passwords, OTPs, cookies, payment credentials, or private personal documents.
- Do not store authentication tokens in `localStorage`.
- Keep payment redirects and callback handling compatible with the configured bKash environment.
- Treat uploaded resumes, profile images, and additional documents as sensitive user data.
- Preserve pagination, filtering, search debounce, and status query parameters when modifying data tables.

### 20.6 Offline and network behavior

The frontend has network-status and selected offline-queue support. When adding a mutation:

1. Determine whether the operation is safe to queue and retry.
2. Avoid queueing payment, authentication, or other operations that must be confirmed immediately unless the backend contract explicitly supports it.
3. Prevent duplicate submissions while a mutation is pending.
4. Show a clear offline or synchronization state.
5. Refresh the relevant query after synchronization.
6. Surface a failed queued request instead of silently dropping it.

### 20.7 UI and accessibility rules

- Preserve visible labels, keyboard focus, and accessible names for buttons and icon-only controls.
- Use the shared UI primitives and existing visual language.
- Provide responsive behavior for phone, tablet, and desktop layouts.
- Keep tables usable on narrow screens; provide detail views for dense records.
- Use loading skeletons for data-heavy screens and meaningful empty states when no records exist.
- Confirm destructive actions and clearly identify what will be changed.
- Disable a submit/action button while its mutation is pending.
- Do not rely on color alone for status meaning; include text labels.

### 20.8 Validation and verification checklist

Before merging a frontend change:

1. Confirm the affected role can still reach the intended route.
2. Confirm unauthorized roles are redirected or shown an access-denied state.
3. Test loading, success, validation-error, backend-error, empty, and offline states where applicable.
4. Test the relevant status transitions using current record versions.
5. Test mobile navigation and the affected responsive layout.
6. Run the smallest relevant checks:

```bash
bun run lint
bun run build
```

7. If the API contract changed, update both API integration documents and the matching user-facing manual sections.

### 20.9 Documentation quality standard

User instructions should:

- Name the visible navigation item exactly as it appears in the interface.
- Explain prerequisites before an action.
- State when an action is unavailable and why.
- Describe the expected success result.
- Include recovery steps for common failures.
- Avoid promising features that are not exposed by the current frontend/backend integration.

Technical documentation should:

- Identify the source file or route when behavior is implementation-specific.
- Keep examples consistent with the current API payload and status names.
- Distinguish deployment-dependent behavior, such as email delivery and bKash sandbox configuration.
