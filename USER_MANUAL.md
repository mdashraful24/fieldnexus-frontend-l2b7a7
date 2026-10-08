# Field Nexus User Manual

## 1. Welcome to Field Nexus

Field Nexus is a field-service management platform. It connects customers who need a service with administrators, vendors, and technicians who coordinate and complete that service.

The normal service journey is:

1. A customer submits a booking.
2. An administrator reviews and approves it.
3. The administrator assigns a technician.
4. The technician accepts the assignment, travels to the site, and performs the work.
5. The technician submits a service report and marks the work complete.
6. The customer reviews the completed work, leaves feedback, and pays through bKash.

This manual explains how to use the website as a first-time visitor and how each supported user role uses the dashboard.

## 2. User Roles

Your role controls which dashboard and actions are available.

| Role | Main responsibility | Main dashboard |
| --- | --- | --- |
| Customer | Request and pay for services | `/customer` |
| Technician | Accept and complete assigned work | `/technician` |
| Admin | Manage users, bookings, vendors, technicians, payments, and reports | `/admin` |
| Super Admin | Manage administrators and top-level platform access | `/admin/admins` |

Vendors are managed by administrators. In the current website navigation, vendor administration is an Admin feature rather than a separate vendor dashboard.

## 3. First Visit: Public Website Tour

You can visit the public pages without signing in:

- **Home**: Learn what Field Nexus does and start a service journey.
- **About Us**: Review the platform story, values, roles, and how the process works.
- **Vendors**: Browse approved vendors and open a vendor detail page.
- **Contact**: Send a question or support message.
- **Security, Privacy, and Terms**: Review the platform policies.
- **Apply**: Apply to become a technician.
- **Log in** and **Create an account**: Access the authenticated platform.

Use the main header navigation to move between public pages. If you are already signed in, use your profile menu or dashboard link to return to your role dashboard.

## 4. Create a Customer Account

Customer registration is the standard way to begin using Field Nexus.

1. Open **Create an account**.
2. Enter your:
   - Full name
   - Email address
   - Contact number
   - Password
   - Password confirmation
3. Submit the form.
4. Check your email for the verification code.
5. Enter the code on the **Verify account** page.
6. After successful verification, open the login page and sign in.

The website also provides Google sign-in where it is configured. If an existing email account is linked to Google sign-in, the platform may send a confirmation email.

### If verification does not arrive

- Check the spam or junk folder.
- Confirm that the email address is correct.
- Use the resend-code option on the verification page.
- Wait for the current code to expire before requesting another one if the page indicates an expiry.

## 5. Sign In, Sign Out, and Password Recovery

### Sign in

1. Open **Log in**.
2. Enter your email and password.
3. Submit the form.
4. You are sent to the dashboard for your role.

### Forgot password

1. Select **Forgot password** on the login page.
2. Enter the email address associated with your account.
3. Check your email for the reset code.
4. Enter the code and choose a new password.
5. Return to the login page and sign in again.

### Sign out

Open the avatar/profile menu in the dashboard sidebar and choose **Log out**. Always sign out on a shared computer.

## 6. Customer Guide

### 6.1 Customer dashboard

The Customer dashboard provides access to:

- Overview
- Create Booking
- View Bookings
- Payment History
- My Profile

The overview is the best starting point after login. Use **Create Booking** to submit a new request or **View Bookings** to follow existing requests.

### 6.2 Create a booking

1. Open **Customer → Create Booking**.
2. Enter a short title describing the problem, such as “Air conditioner not cooling”.
3. Select an active **Service category**.
4. Choose a priority:
   - **Low**: The work can wait.
   - **Medium**: Normal service need.
   - **High**: The issue needs earlier attention.
   - **Urgent**: The issue needs immediate attention.
5. Optionally enter a preferred time.
6. Add a clear description of the issue when the title is not enough.
7. Submit the booking.

After submission, the booking receives a work-order number and starts in **Pending** status. An administrator must review it before it can be assigned.

### 6.3 Follow a booking

Open **Customer → View Bookings**, then select a booking to see its details. The detail page can show:

- Work-order number and request information
- Service category and priority
- Current status
- Assigned technician information when available
- Service report after the technician submits it
- Feedback and payment actions when eligible

Refresh the list or reopen the detail page after an administrator or technician changes the booking.

### 6.4 Cancel a booking

Customers can cancel their own booking while it is **Pending** or **Approved**.

1. Open the booking details.
2. Choose the cancel action.
3. Enter a cancellation reason if requested.
4. Confirm the cancellation.

Cancellation is not available once the job has progressed into assignment or field work. The platform sends a cancellation confirmation email.

### 6.5 Review completed work and leave feedback

When a booking reaches **Completed**:

1. Open the booking details.
2. Choose **Feedback**.
3. Give a rating from 1 to 5.
4. Add an optional comment.
5. Submit the feedback.

Feedback is available only for completed work and can be viewed by the permitted parties.

### 6.6 Pay for completed work

1. Open a completed booking.
2. Choose **Pay Now**.
3. The website redirects you to the configured bKash checkout.
4. Complete or cancel the payment in the bKash flow.
5. Return to Field Nexus and open **Payment History** to confirm the result.

Payment is available only after the work order is completed. Successful payments appear as paid and may generate a receipt email with an invoice attachment.

### 6.7 Payment history, cancellation, and refunds

Open **Customer → Payment History** to view payment records and open an individual payment for its details.

- A pending or unpaid payment can be cancelled when the action is available.
- A successful paid payment can be submitted for refund.
- Refund requests require a reason when the form asks for one.
- A successful refund changes the payment to **Refunded** and sends a confirmation email.

Refund availability can depend on the payment state and backend payment-provider configuration.

## 7. Technician Guide

Technicians use the dashboard to manage only the work orders assigned to them.

### 7.1 Technician dashboard

The Technician navigation contains:

- Overview
- My Work Orders
- Payments
- My Profile

Open **My Work Orders** to see assigned jobs and select one for its full details.

### 7.2 Respond to an assignment

When an administrator assigns a job, it appears as **Assigned** and awaits your response.

To accept it:

1. Open the work order.
2. Review the customer request, category, priority, schedule, and location information.
3. Choose **Accept**.

To decline it:

1. Choose **Decline**.
2. Enter a clear reason.
3. Confirm **Decline assignment**.

Declining returns the work order to the administrator so another technician can be assigned.

### 7.3 Move a job through the field-work stages

After accepting an assignment, use the status actions in order:

1. **Head to Site** moves the job to **En Route**.
2. **Start Work** moves the job to **In Progress**.
3. Perform and document the service.
4. Open **Service Report** and submit the report.
5. After a report exists, choose **Mark Completed**.

The website does not unlock completion until the service report has been submitted. A technician can report a failure instead when the job cannot be completed.

### 7.4 Submit a service report

Include:

- Work description
- Issue found, if applicable
- Solution provided, if applicable
- Hours worked
- Parts used, including each part name and quantity

Review the details before submitting. After submission, the report is available from the work-order details and the completion action becomes available.

### 7.5 Technician payments

Technicians can open **Payments** to view payment records allowed for their account. Payment collection is performed by the customer; the technician does not initiate the customer checkout.

## 8. Admin Guide

Admins coordinate the operational workflow. The Admin sidebar contains:

- Overview
- Users
- Technician Approval
- Vendors
- Work Orders
- Payments
- Service Categories
- Contact Messages
- Audit Logs
- My Profile

### 8.1 Admin overview

The overview displays operational metrics and charts, including users, vendors, work orders, applications, payments, revenue, and work-order statuses. Use the linked KPI cards to open the related management page.

### 8.2 Manage users

Open **Users** to search and filter users by role or status. Open a user to review details and use the available actions to block, delete, or restore an account.

Account actions affect access. Confirm that you have selected the correct user before changing a status.

### 8.3 Approve technician applications

1. Open **Technician Approval**.
2. Review pending applications and open an application for its details.
3. Review the applicant information and uploaded resume/documents.
4. Choose **Approve** or **Reject**.
5. When rejecting, provide a clear reason.

Applicants receive application-status email notifications.

### 8.4 Manage vendors and vendor teams

Open **Vendors** to:

- Create a vendor
- Review vendor details
- Approve or suspend a vendor
- View vendor performance
- Add technicians to a vendor team
- Remove or restore a team member where permitted
- Delete or restore a vendor where permitted

Only approved, active vendor and technician records should be used for new assignments.

### 8.5 Process work orders

Open **Work Orders** to view all jobs and filter by status, priority, or search text.

For a new customer booking:

1. Open the **Pending** work order.
2. Review the request and customer details.
3. Approve it to move it to **Approved**.
4. Use the assignment action to select a vendor and technician.
5. Confirm the assignment.

An assigned work order becomes **Assigned** and appears in the technician's work-order list. Admins can edit eligible fields, cancel a work order, inspect its service report, inspect feedback, and soft-delete records where permitted.

When editing or changing status, the website protects against simultaneous edits. If another user changed the record first, reload the work order and retry using the latest data.

### 8.6 Manage payments

Open **Payments** to search payment records, inspect payment details, cancel eligible unpaid payments, and process refunds for paid payments.

Use the payment detail view to verify the associated work order and current payment state before taking action.

### 8.7 Manage service categories

Open **Service Categories** to create, edit, activate, deactivate, or delete categories. Customers can select only active categories when creating a booking.

Keep category names and base prices clear because customers see them in the booking form.

### 8.8 Contact messages and audit logs

- **Contact Messages** contains messages submitted from the public contact page.
- **Audit Logs** records administrative activity when audit logging data is available.

Use these pages for support follow-up and operational traceability.

## 9. Super Admin Guide

Super Admins inherit the Admin navigation and also have access to **Admins**.

From **Admin → Admins**, a Super Admin can:

- Create an administrator
- View administrator details
- Block or delete an administrator
- Restore a soft-deleted administrator
- Reset an administrator password
- Change an administrator email address

Use these actions carefully because they change platform-wide administrative access.

## 10. Work-Order Status Reference

The expected status sequence is:

```text
Pending → Approved → Assigned → Accepted → En Route
        → In Progress → Completed
```

Other statuses may include:

- **Cancelled**: The request or job was cancelled.
- **Reassigned**: The previous assignment was rejected or replaced.
- **Failed**: The technician reported that the work could not be completed.

Do not skip stages. The system validates transitions and rejects actions that are not allowed for the current status or user role.

## 11. Notifications and Email

Use the notification bell in the dashboard to view notifications. You can open an individual notification, mark it read, or mark all notifications as read.

The system may send emails for:

- Registration verification and welcome messages
- Password reset and password-change confirmation
- Technician application received, approved, or rejected
- Work-order cancellation
- Successful payment and payment receipt
- Refund confirmation
- Google sign-in linking

If an email is missing, check spam/junk folders and confirm that the account email is correct.

## 12. Profile and Account Settings

Open **My Profile** from the dashboard sidebar or avatar menu to:

- View account information
- Edit profile information
- Upload a profile picture

Use a supported image file and keep the file size within the limit shown by the form. Save profile changes before leaving the page.

## 13. Offline and Network Behavior

The frontend includes network-status and offline-queue support for selected operations. If the connection drops:

1. Look for the offline indicator.
2. Avoid repeatedly submitting the same form.
3. Wait for the connection to return.
4. Check the booking or work-order list to confirm whether the action was saved.

For payment, authentication, and other time-sensitive operations, use a stable connection and confirm the final status after returning to the website.

## 14. Common Problems

| Message or symptom | Meaning | What to do |
| --- | --- | --- |
| You are sent back to login | Your session expired or you are not authenticated | Sign in again |
| Access denied | Your role cannot use that page or action | Open the dashboard for your assigned role or contact an Admin |
| Invalid transition | The work order is not at the required stage | Open the latest work-order details and follow the status sequence |
| Conflict or outdated data | Someone else changed the record | Reload the record and retry |
| No service categories available | No active category is configured | Ask an Admin to activate or create a category |
| Payment URL is missing | Payment-provider setup failed or the request was rejected | Do not retry repeatedly; check payment history and contact support |
| Verification/reset email missing | Email delivery delay or spam filtering | Check junk mail and use the resend action |
| Page shows no records | Filters may be too narrow or the role has no records | Clear filters, refresh, and confirm the correct account |

Never share your password, email verification code, payment credentials, or session information with another person.

## 15. Recommended First-Time Customer Checklist

- [ ] Read the public service and policy pages.
- [ ] Create an account with an email address you can access.
- [ ] Verify the account from the email code.
- [ ] Complete your profile and contact information.
- [ ] Create a booking with a specific title, category, priority, and description.
- [ ] Save the work-order number.
- [ ] Check **View Bookings** for status updates.
- [ ] Review the service report after completion.
- [ ] Submit feedback.
- [ ] Pay through the bKash checkout.
- [ ] Confirm the payment in **Payment History** and retain the receipt email.

## 16. Scope Notes

This manual describes the behavior exposed by the current Field Nexus frontend and its attached backend integration. Some actions depend on administrator approval, active service categories, approved vendors, technician availability, configured email delivery, and configured bKash credentials. Labels, available buttons, and dashboard data can therefore vary by role, record status, and deployment configuration.

## 17. How to Read the Field Nexus Interface

Field Nexus uses a consistent layout so that the same information is easy to find on desktop and mobile.

### 17.1 Public page header

The public header is the navigation bar at the top of the website. It normally contains:

- The Field Nexus logo, which returns to the home page.
- Links to the main public sections.
- A sign-in action for existing users.
- A create-account action for new customers.
- A mobile menu on smaller screens.

If a link is not visible on a small screen, open the menu button rather than zooming the page.

### 17.2 Public page footer

The footer provides a second way to find important pages. Its groups are:

- **Platform**: Overview, How it works, Browse vendors, and About us.
- **Account**: Sign in, Create account, Apply as a technician, and Forgot password.
- **Legal**: Terms of service, Privacy policy, and Security.

On a phone, tap a footer group heading to expand or collapse its links.

### 17.3 Dashboard sidebar

After login, the dashboard uses a sidebar. The sidebar is generated from your role, so you will not see pages that your account is not allowed to use.

The sidebar contains:

- A Field Nexus link at the top.
- Role-specific navigation groups.
- A profile area at the bottom.
- A collapse/expand rail on supported screen sizes.

If the sidebar is collapsed, select the rail or menu control to display the text labels again.

### 17.4 Dashboard top bar

The dashboard top bar provides:

- A mobile sidebar toggle.
- The current page title or breadcrumb context.
- The notification bell.
- Your account avatar.

The notification bell shows a badge when unread notifications are available. Select the bell to open the notification list.

### 17.5 Tables, filters, and details

Management pages commonly use a table or card list:

1. Use search to find a specific name, email, work-order number, or keyword.
2. Use filters to narrow by status, role, priority, or category.
3. Select a row, **View**, **Details**, or an action button to open more information.
4. Clear filters before assuming that no records exist.
5. On mobile, swipe horizontally when a table contains more columns than the screen width.

Actions may be disabled when the record is in a state that does not permit that action. This is expected behavior, not a missing permission in every case.

### 17.6 Forms and validation

Forms validate required fields when you leave a field or submit the form. A red message identifies the field that needs attention.

Good form habits:

- Enter the requested format exactly.
- Use a real email address for account and application workflows.
- Do not paste extra spaces at the start or end of names and descriptions.
- Select a value from a dropdown instead of typing a similar value.
- Wait for the success or error message before navigating away.

## 18. Complete Customer Journey: Worked Example

This example shows the complete customer path for an air-conditioning repair.

### Step 1: Discover the service

1. Visit the Field Nexus home page.
2. Read **How it works** to understand the request, assignment, field-work, and payment stages.
3. Open **Browse vendors** if you want to understand which approved vendor teams may provide services.
4. Choose **Create account**.

### Step 2: Create and verify the account

1. Enter your name, email, phone number, password, and confirmation.
2. Submit registration.
3. Open the verification email.
4. Enter the one-time code.
5. Sign in.

### Step 3: Prepare the account

1. Open the avatar menu.
2. Select **Edit Profile**.
3. Confirm your name and contact information.
4. Upload a profile photo if useful.
5. Save the changes.

### Step 4: Submit the request

1. Select **Create Booking**.
2. Enter `Air conditioner not cooling` as the title.
3. Choose the matching category.
4. Select **High** if the issue is affecting normal use.
5. Choose a preferred date and time if the field is available.
6. Describe the symptoms, for example: the unit powers on, the fan runs, but the room does not cool.
7. Submit.
8. Record the generated work-order number.

### Step 5: Wait for review

The booking begins as **Pending**. An Admin reviews the request. Do not create duplicate bookings simply because the first booking is still pending.

### Step 6: Follow assignment

After approval and assignment, the booking changes through **Approved**, **Assigned**, and **Accepted**. The assigned technician may then change it to **En Route** and **In Progress**.

Use **View Bookings** and the notification bell to follow progress.

### Step 7: Review completion

When the technician submits the service report and completes the work:

1. Open the booking details.
2. Read the work description and solution.
3. Check the reported hours and parts used.
4. Contact support through the public Contact page if the information does not match the service performed.

### Step 8: Give feedback and pay

1. Submit a 1–5 rating and optional comment.
2. Select **Pay Now**.
3. Complete the bKash checkout.
4. Return to Field Nexus.
5. Confirm the payment status and retain the receipt email.

## 19. Customer Booking Decision Guide

| Situation | Recommended action |
| --- | --- |
| You have not submitted a request | Use **Create Booking** |
| The request is Pending | Wait for Admin review or cancel if necessary |
| The request is Approved | Wait for assignment or cancel if the service is no longer needed |
| The request is Assigned | Review the technician information and wait for acceptance |
| The technician is En Route | Be available at the service location |
| The job is In Progress | Avoid changing or duplicating the request |
| The job is Completed | Read the report, leave feedback, and pay |
| The job is Cancelled | Review the cancellation message and create a new request only if needed |
| The job is Failed | Contact support or wait for an Admin to arrange reassignment |

## 20. Technician Application Guide

Anyone interested in becoming a technician can begin from **Apply as a technician** in the public header or footer.

### 20.1 Prepare before applying

Have the following ready:

- A valid name and contact email
- Professional or trade information requested by the form
- A current resume
- Any additional supporting documents requested by the form

The application accepts a required resume and may accept up to five additional documents. Use readable files with clear filenames.

### 20.2 Submit the application

1. Open **Apply as a technician**.
2. Complete all required personal and professional fields.
3. Attach the resume.
4. Attach additional documents if they support your application.
5. Review the files and submit.
6. Save the email address used for the application.

The system sends an application-received email when delivery is configured.

### 20.3 Check application status

Open **Application status** or the status link shown after submission. Enter the application email when requested.

Possible results include:

- **Pending**: The Admin has not completed the review.
- **Approved**: The application was accepted.
- **Rejected**: The application was not accepted; read the reason if provided.

An approved application does not necessarily mean that a work order is immediately assigned. The technician must also be active and connected to an approved vendor team where required.

## 21. Admin: Recommended Daily Routine

Admins can use this routine to avoid missing operational work.

### Start of day

1. Open **Admin → Overview**.
2. Review pending work orders, overdue or failed work, pending vendor records, and pending technician applications.
3. Open **Notifications** and mark messages as read after reviewing them.
4. Open **Contact Messages** for customer or applicant questions.

### Process new service demand

1. Open **Work Orders**.
2. Filter for **Pending**.
3. Open each request and verify category, priority, requested time, and description.
4. Approve valid requests.
5. Assign an approved vendor and technician.
6. Check for scheduling conflicts before confirming the assignment.

### Monitor active field work

1. Filter for **Assigned**, **Accepted**, **En Route**, and **In Progress**.
2. Open records that have remained unchanged longer than expected.
3. Review technician reports and customer communication where available.
4. Reassign rejected or failed work when appropriate.

### End of day

1. Review newly completed work orders.
2. Check payment records and failed payment attempts.
3. Review pending refunds or cancellations.
4. Check the audit log for important administrative changes.
5. Sign out if using a shared workstation.

## 22. Admin: Vendor and Technician Assignment Rules

Before assigning a technician, confirm:

- The vendor is approved and not suspended.
- The technician belongs to the selected vendor team.
- The technician is available for the requested time.
- The technician has the skills needed for the category.
- The work order is in **Approved** status.
- The current work-order details are fresh.

If the assignment cannot be saved:

1. Reopen the work order.
2. Confirm that it was not assigned by another Admin.
3. Check the selected vendor and technician status.
4. Check whether the requested time conflicts with another job.
5. Try again with the current record version.

## 23. Admin: Managing Service Categories Well

Service categories are customer-facing choices. A useful category should:

- Have a short, recognizable name.
- Describe one kind of service clearly.
- Have an accurate base price when pricing is used.
- Remain active only while the organization can fulfill it.

Deactivate a category instead of deleting it when historical bookings still need to display its name. Delete or soft-delete only when the organization's retention policy allows it.

## 24. Admin: User Status and Recovery

When managing a user:

1. Search by a unique email or name.
2. Open the user details before changing status.
3. Confirm the role and recent activity.
4. Apply the smallest necessary action.
5. Confirm the success notification.
6. Reopen the record to verify the new status.

Use restore rather than creating a duplicate account when a soft-deleted user should regain access. A blocked account may require an intentional status change before it can sign in again.

## 25. Super Admin: Safe Administrator Provisioning

When creating an Admin:

1. Confirm the person’s identity and work email.
2. Use a unique email address.
3. Provide a temporary strong password through an approved secure channel.
4. Tell the new Admin to change the password immediately.
5. Confirm that the account appears in the Admins list.
6. Grant only the access required by the job.

When an administrator leaves the organization, block or delete the account according to policy. Restore an account only after verifying that access should be returned.

## 26. Payments: Status and Safe Handling

Payment records can move through states such as:

- **Pending**: A payment has been started but is not confirmed.
- **Paid**: The provider confirmed the payment.
- **Failed**: The provider or checkout did not complete successfully.
- **Cancelled**: The payment was cancelled before completion.
- **Refunded**: A paid transaction was successfully returned.

Before retrying payment:

1. Open **Payment History**.
2. Check whether an earlier attempt is Pending or Paid.
3. Do not start multiple checkouts for the same completed work order without confirming the first attempt.
4. Use the payment detail page to identify the work order and transaction.

Never ask a customer to send a password, one-time code, or full payment credentials through a contact message.

## 27. Accessibility and Mobile Use

Field Nexus is designed to work on desktop and smaller screens.

- Use the mobile menu to access public navigation.
- Use the dashboard sidebar toggle on a phone.
- Use visible labels rather than relying only on icons.
- Use browser zoom carefully; very high zoom may make tables scroll horizontally.
- When a dialog opens, complete it or close it before selecting another action.
- Use keyboard focus to move through fields and buttons when needed.
- Do not submit a form twice while the button shows a loading state.

If a table is difficult to read on a phone, open the individual record detail instead of repeatedly scrolling the full table.

## 28. Support Contact Procedure

Use the public **Contact** page when you need help.

Include:

- Your name
- The email address connected to the account
- A short subject
- A complete explanation of the problem
- The work-order or payment number, if relevant
- The approximate time the problem occurred

Do not include passwords, verification codes, bKash PINs, or full card/payment credentials. A support request should contain enough information to locate the record but not sensitive secrets.

## 29. Glossary

| Term | Meaning |
| --- | --- |
| Booking | The customer-facing name for a service request |
| Work order | The operational record created from a booking |
| Work-order number | The human-readable identifier used to find a job |
| Service category | The type of work requested |
| Priority | How urgently the customer needs the work |
| Vendor | An approved service company or subcontractor |
| Technician | The field worker who performs the service |
| Assignment | The link between a work order and its technician |
| Service report | The technician's record of work, issue, solution, hours, and parts |
| Feedback | A customer's rating and optional comment after completion |
| bKash callback | The provider confirmation sent back after a checkout attempt |
| Soft delete | Hiding a record while preserving it for operational history |
| Version | The record revision used to prevent overwriting another user's changes |
| SLA | The expected service-level deadline associated with a work order |

## 30. Frequently Asked Questions

### Why can I see the website but not the dashboard?

Public pages are available without authentication. Dashboard pages require a verified, active account and a permitted role.

### Why can I not create a booking?

You may not be signed in as a Customer, the session may have expired, or there may be no active service categories. Sign in again and contact an Admin if categories are unavailable.

### Why has my booking stayed Pending?

Pending bookings require Admin review. Processing time depends on the operating team. Avoid creating duplicate requests while waiting.

### Why can I not cancel my booking?

Customers can cancel only Pending or Approved bookings. Once the job is assigned or field work has started, cancellation must be handled according to the organization's support process.

### Why can the technician not complete the work order?

The technician must submit a service report before the **Mark Completed** action becomes available. The current record may also have changed; refresh the work order if an outdated-data message appears.

### Why is the payment button missing?

Payment is shown for eligible completed work orders when there is an outstanding payment. Check that the work order is actually Completed and review Payment History for an existing payment attempt.

### Why did the Admin assignment fail?

The vendor may not be approved, the technician may not belong to that vendor, the technician may have a scheduling conflict, or another Admin may have changed the work order. Reopen the current record and verify the assignment choices.

### Why did I get an access-denied message?

The page or action belongs to another role. Return to your role dashboard or ask an Admin/Super Admin to confirm the account role.

### Why did my change disappear?

The record may have been edited by another user, the request may have failed, or the browser may have lost connection. Look for the success/error toast, reopen the record, and check the notification or list.

### Can I use the same account as both Customer and Technician?

The current application assigns one primary role to an account. Use the role assigned by the platform rather than assuming that a Customer account can access Technician or Admin pages.

## 31. Product Usage Checklist by Role

### Customer

- [ ] Verify the email address.
- [ ] Complete contact information.
- [ ] Create one detailed booking.
- [ ] Save the work-order number.
- [ ] Monitor status.
- [ ] Read the service report.
- [ ] Leave feedback.
- [ ] Confirm payment and retain the receipt.

### Technician

- [ ] Keep application and profile information current.
- [ ] Review each assignment before accepting.
- [ ] Give a reason when declining.
- [ ] Update status while traveling and working.
- [ ] Submit a complete service report.
- [ ] Confirm completion only after the report is saved.

### Admin

- [ ] Review pending requests daily.
- [ ] Keep service categories active and accurate.
- [ ] Approve only valid vendors and technicians.
- [ ] Assign available technicians.
- [ ] Monitor active and failed work.
- [ ] Reconcile payments and refunds.
- [ ] Review contact messages and audit activity.

### Super Admin

- [ ] Create only approved administrator accounts.
- [ ] Use secure temporary credentials.
- [ ] Review administrator status regularly.
- [ ] Block or delete departed administrators promptly.
- [ ] Restore access only after verification.

## 32. Final First-Time Walkthrough

If you are completely new to Field Nexus, follow this order:

1. Visit the home page and read **How it works**.
2. Browse the vendor directory to understand the service ecosystem.
3. Read the Terms, Privacy, and Security pages.
4. Create a Customer account.
5. Verify your email.
6. Sign in and open the profile menu.
7. Review or update your profile.
8. Open the Customer overview.
9. Create a sample or real booking with an accurate title and description.
10. Open View Bookings and learn where the work-order status appears.
11. Open the notification bell and learn how unread notifications are shown.
12. After completion, inspect the service report.
13. Submit feedback.
14. Pay through bKash.
15. Open Payment History and confirm the receipt or final status.

This sequence gives a new user a complete understanding of the platform without requiring them to explore administration pages they are not authorized to use.
