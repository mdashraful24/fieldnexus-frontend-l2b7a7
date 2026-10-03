import type { Metadata } from "next";
import LegalPage, {
  BulletList,
  type LegalSection,
  Note,
  NumberList,
  P,
} from "@/components/modules/legal/LegalPage";
import { createMetadata } from "@/lib/metadata";

const sections: LegalSection[] = [
  {
    id: "acceptance",
    title: "1. Acceptance of these terms",
    content: (
      <>
        <P>
          These Terms of Service (the{" "}
          <strong className="text-foreground">Terms</strong>) form a binding
          agreement between you and Field Nexus (the{" "}
          <strong className="text-foreground">Platform</strong>,{" "}
          <strong className="text-foreground">we</strong>,{" "}
          <strong className="text-foreground">us</strong>) covering your access
          to and use of the Platform, including the websites, dashboards, and
          mobile or web applications we operate for managing field service work
          orders.
        </P>
        <P>
          By creating an account, applying as a vendor or technician, or
          otherwise using the Platform, you confirm that you have read,
          understood, and agree to be bound by these Terms, our{" "}
          <a
            href="/privacy"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Privacy Policy
          </a>
          , and our{" "}
          <a
            href="/security"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Security overview
          </a>
          .
        </P>
        <P>
          If you do not agree with these Terms, you must not create an account
          or use the Platform. If you use the Platform on behalf of an
          organisation, you confirm that you are authorised to bind that
          organisation, and &quot;you&quot; includes that organisation.
        </P>
      </>
    ),
  },
  {
    id: "eligibility",
    title: "2. Eligibility and roles",
    content: (
      <>
        <P>
          The Platform serves four roles. Your role determines what you can see,
          create, and approve.
        </P>
        <BulletList
          items={[
            <>
              <strong className="text-foreground">Customers</strong> raise work
              orders, track their status, and pay for completed service.
            </>,
            <>
              <strong className="text-foreground">Technicians</strong> apply for
              approval, accept assignments, travel to sites, and submit service
              reports.
            </>,
            <>
              <strong className="text-foreground">Vendors</strong> manage their
              organisation, its technician members, and the work orders assigned
              to them.
            </>,
            <>
              <strong className="text-foreground">Admins</strong> and{" "}
              <strong className="text-foreground">Super Admins</strong> review
              applications, approve requests, assign technicians, and oversee
              the platform.
            </>,
          ]}
        />
        <P>
          You must be at least 18 years old, legally capable of entering into
          these Terms, and located in a jurisdiction where the Platform is
          lawfully available. The Platform is currently operated for services
          delivered in Bangladesh, and all prices are quoted in Bangladeshi Taka
          (BDT).
        </P>
        <Note>
          Technician and vendor accounts are subject to review. Access is
          granted only after an administrator approves your application, and a
          vendor account requires a verified business registration.
        </Note>
      </>
    ),
  },
  {
    id: "accounts",
    title: "3. Accounts and registration",
    content: (
      <>
        <P>
          You must provide accurate, current, and complete information at
          registration and keep it updated. You can register with an email
          address and password, or sign in through a supported third-party
          identity provider. Where email verification is required, you must
          complete it before using features that depend on a verified account.
        </P>
        <P>You are responsible for:</P>
        <BulletList
          items={[
            "Keeping your password and any linked sign-in provider credentials confidential.",
            "All activity that occurs under your account, whether by you or by someone you have given access to.",
            "Telling us promptly if you suspect unauthorised access, and changing your password immediately if you do.",
          ]}
        />
        <P>
          Accounts are personal to you. You may not share, resell, or transfer
          your account or credentials. Technician credentials may only be used
          by the named technician, and must not be used to carry out work
          outside the Platform.
        </P>
        <P>
          We may suspend, block, or delete an account that is used to breach
          these Terms, impersonate another person, or submit fraudulent
          information. Suspended and deleted accounts are not reinstated except
          at our discretion.
        </P>
      </>
    ),
  },
  {
    id: "vendor-technician-approval",
    title: "4. Vendor and technician approval",
    content: (
      <>
        <P>
          Technicians and vendors are onboarded through a review process. A
          technician application is reviewed and marked approved, rejected, or
          pending. A vendor account moves through pending, approved, and
          suspended states.
        </P>
        <P>Approval is conditional on you maintaining:</P>
        <BulletList
          items={[
            "Valid identity and contact information, and the ability to verify them on request.",
            "For vendors: a registered business, tax identification, and a bank account for settlement.",
            "The skills, tools, and insurance appropriate to the categories you take work in.",
            "Compliance with these Terms, applicable law, and site safety requirements.",
          ]}
        />
        <P>
          We verify credentials and may re-verify them periodically. Approval
          does not guarantee a minimum volume of work. We may suspend or revoke
          approval if information becomes inaccurate, performance standards are
          not met, or we receive a substantiated complaint.
        </P>
      </>
    ),
  },
  {
    id: "work-orders",
    title: "5. Work orders and service delivery",
    content: (
      <>
        <P>
          A customer raises a work order with a category, a priority level, and
          a requested schedule. Every work order moves through a defined
          lifecycle:
        </P>
        <NumberList
          items={[
            <>
              <strong className="text-foreground">Pending</strong> — submitted
              and awaiting review.
            </>,
            <>
              <strong className="text-foreground">Approved</strong> — accepted
              by an administrator, pending assignment.
            </>,
            <>
              <strong className="text-foreground">Assigned</strong> — a vendor
              and technician have been allocated.
            </>,
            <>
              <strong className="text-foreground">Accepted</strong> — the
              technician has confirmed the assignment.
            </>,
            <>
              <strong className="text-foreground">En route</strong> — the
              technician is travelling to the site.
            </>,
            <>
              <strong className="text-foreground">In progress</strong> — work is
              underway.
            </>,
            <>
              <strong className="text-foreground">Completed</strong> — the
              service report has been submitted and the order closed.
            </>,
            <>
              <strong className="text-foreground">Cancelled</strong>,{" "}
              <strong className="text-foreground">Reassigned</strong>, or{" "}
              <strong className="text-foreground">Failed</strong> — the order
              was stopped, moved to another technician, or could not be
              completed.
            </>,
          ]}
        />
        <P>Customers agree to:</P>
        <BulletList
          items={[
            "Provide accurate information about the site, the problem, and access arrangements.",
            "Ensure an adult representative is present at the site during the agreed window unless we agree otherwise.",
            "Provide safe and reasonable access. You are responsible for hazards we could not reasonably have identified.",
            "Pay the agreed amount once the work is marked completed.",
          ]}
        />
        <P>
          Technicians and vendors agree to arrive within the agreed window,
          carry out work with reasonable skill and care, record the parts and
          hours used, and submit a service report before the order is closed.
        </P>
        <P>
          If a technician cannot complete the work, the order may be marked
          failed or reassigned. Where reassignment is possible, the customer is
          notified and no additional charge applies for the reassignment itself.
        </P>
      </>
    ),
  },
  {
    id: "quotes-and-payment",
    title: "6. Quotes, fees, and payment",
    content: (
      <>
        <P>
          A price shown before work begins is an{" "}
          <strong className="text-foreground">quote</strong>, not an invoice. It
          becomes binding when it is recorded against an approved and assigned
          work order. Any change to scope or price must be agreed in advance and
          recorded on the order.
        </P>
        <P>
          Payment is collected through bKash. We do not store your bKash PIN,
          OTP, or full account credentials; payment is completed on the gateway
          and we receive only the resulting payment record, including the
          amount, currency, gateway reference, and status.
        </P>
        <P>A payment record is always in one of these states:</P>
        <BulletList
          items={[
            <>
              <strong className="text-foreground">Unpaid</strong> — created but
              not yet settled.
            </>,
            <>
              <strong className="text-foreground">Paid</strong> — settled
              successfully.
            </>,
            <>
              <strong className="text-foreground">Failed</strong> — the gateway
              did not complete the transaction.
            </>,
            <>
              <strong className="text-foreground">Cancelled</strong> — the work
              order was cancelled before settlement.
            </>,
            <>
              <strong className="text-foreground">Refunded</strong> — returned
              to the customer in line with section 7.
            </>,
          ]}
        />
        <P>
          We may add a platform fee or a quoted service charge as displayed at
          the point of work order creation. Payment history is visible to the
          customer and to administrators for reconciliation.
        </P>
      </>
    ),
  },
  {
    id: "refunds",
    title: "7. Refunds and disputes",
    content: (
      <>
        <P>
          Where work is not performed as described in the service report, tell
          us within 14 days of the order being marked completed. We will review
          the order, the service report, and the audit trail, and respond within
          a reasonable period.
        </P>
        <P>
          Where our review finds the service was materially not delivered, we
          may:
        </P>
        <BulletList
          items={[
            "Reassign the work to another technician at no additional charge.",
            "Refund all or part of the amount paid, recorded against the order as refunded.",
            "Require the technician or vendor to correct the work at their own cost.",
          ]}
        />
        <P>
          Refunds are returned through the original payment method. Where a
          bKash refund cannot be completed to the original account, we will
          agree an alternative method with you. Amounts already paid out to a
          vendor or technician may be recovered from them where recovery is
          reasonably practicable.
        </P>
        <P>
          A disagreement about the quality of completed work is handled under
          this section first. It does not prevent either party from pursuing the
          dispute resolution process in section 14.
        </P>
      </>
    ),
  },
  {
    id: "ratings",
    title: "8. Ratings and reputation",
    content: (
      <>
        <P>
          Customers may rate a completed job, and those ratings contribute to a
          technician&rsquo;s and vendor&rsquo;s public profile. Ratings reflect
          the opinion of the customer who paid for the work and do not represent
          a guarantee by us.
        </P>
        <P>
          You may not review your own work, coordinate or request a specific
          rating, or use reviews to harass, defame, or make unlawful claims. We
          may remove a rating that is abusive, misleading, or connected to a
          payment arrangement outside the Platform.
        </P>
        <P>
          A consistently low rating may affect how work is allocated to you. We
          do not charge for favourable placement, and we do not allow paid
          placement of ratings.
        </P>
      </>
    ),
  },
  {
    id: "prohibited",
    title: "9. Prohibited activities",
    content: (
      <>
        <P>You must not use the Platform to:</P>
        <BulletList
          items={[
            "Break any law, or infringe the rights of another person.",
            "Submit false, misleading, or fabricated work orders, service reports, reviews, or identity documents.",
            "Bypass, probe, scan, or test the security of the Platform, except as set out in our Security overview.",
            "Scrape, crawl, harvest, or extract data from the Platform by automated means without our written permission.",
            "Copy, resell, sublicense, or create derivative works from the Platform or its design.",
            "Upload malware, or use the Platform to distribute unsolicited commercial messages.",
            "Circumvent fees, or transact with another user outside the Platform to avoid our payment and audit processes.",
          ]}
        />
      </>
    ),
  },
  {
    id: "ip",
    title: "10. Intellectual property",
    content: (
      <>
        <P>
          The Platform, including its software, design, text, logos, and
          trademarks, is owned by or licensed to us. We grant you a limited,
          non-exclusive, non-transferable, revocable licence to use the Platform
          for its intended purpose during the term of your account.
        </P>
        <P>
          You retain ownership of content you submit, such as work order
          descriptions, service reports, notes, and photographs. You grant us a
          non-exclusive licence to host, store, process, and display that
          content to the extent needed to operate the Platform, share it with
          the parties involved in the work order, and retain it for audit and
          legal purposes. This licence ends when the content is deleted, except
          for records we must retain.
        </P>
        <P>
          Our name, logos, and trade marks may not be used without prior written
          permission.
        </P>
      </>
    ),
  },
  {
    id: "third-parties",
    title: "11. Third-party services",
    content: (
      <>
        <P>
          The Platform relies on third parties, including the bKash payment
          gateway, email and notification providers, identity providers, and
          mapping services. Their terms and privacy policies apply to you
          independently of these Terms.
        </P>
        <P>
          We are not responsible for the acts, omissions, or availability of
          third-party services beyond our own contractual obligations to them.
          Where a third-party service is unavailable, we will make reasonable
          efforts to restore it and will tell you if a work order is affected.
        </P>
      </>
    ),
  },
  {
    id: "availability",
    title: "12. Disclaimers",
    content: (
      <>
        <P>
          The Platform is provided on an &quot;as is&quot; and &quot;as
          available&quot; basis. To the fullest extent permitted by law we
          disclaim all express and implied warranties, including implied
          warranties of merchantability, fitness for a particular purpose,
          non-infringement, and uninterrupted availability.
        </P>
        <P>We do not warrant that:</P>
        <BulletList
          items={[
            "A technician or vendor will be available for a given time or price.",
            "The Platform will be error-free, secure, or available without interruption.",
            "Work performed will meet any outcome you expect; the service report is the authoritative record of what was done.",
          ]}
        />
        <P>
          Nothing in these Terms excludes a warranty, remedy, or right that
          cannot lawfully be excluded under the Consumer Protection Act 1973 or
          any other applicable law.
        </P>
      </>
    ),
  },
  {
    id: "liability",
    title: "13. Limitation of liability",
    content: (
      <>
        <P>
          To the fullest extent permitted by law, neither we, nor our officers,
          employees, or agents, are liable for any indirect or consequential
          loss, loss of profit, loss of business, loss of anticipated savings,
          or loss of data arising from your use of the Platform or from any
          service performed through it.
        </P>
        <P>
          Our total aggregate liability to you for all claims arising out of or
          relating to the Platform is limited to the total amount you paid to us
          through the Platform in the 12 months before the event giving rise to
          the claim.
        </P>
        <P>
          Nothing in these Terms limits liability for death or personal injury
          caused by negligence, for fraud or fraudulent misrepresentation, or
          for any liability that cannot lawfully be limited.
        </P>
      </>
    ),
  },
  {
    id: "indemnity",
    title: "14. Indemnity and dispute resolution",
    content: (
      <>
        <P>
          You agree to indemnify us against claims, damages, and reasonable
          costs arising from your breach of these Terms, your negligence, your
          violation of law, or a claim brought by a third party because of
          content you submitted.
        </P>
        <P>
          Before starting proceedings, you agree to raise the dispute with us in
          writing and allow 30 days to resolve it. We will respond within 15
          days. Most disputes are resolved by correcting the service report,
          reissuing a work order, or issuing a refund.
        </P>
        <P>
          If the dispute is not resolved, it is subject to the exclusive
          jurisdiction of the courts of Bangladesh, and the parties submit to
          that jurisdiction. These Terms are governed by the laws of Bangladesh,
          without regard to conflict of law rules.
        </P>
      </>
    ),
  },
  {
    id: "termination",
    title: "15. Suspension and termination",
    content: (
      <>
        <P>
          You may stop using the Platform and request account deletion at any
          time. Deletion removes your access, but we may retain work orders,
          service reports, payments, and audit records where we are required to
          do so for accounting, tax, dispute, or legal purposes, or to prevent
          abuse.
        </P>
        <P>
          We may suspend an account immediately where we reasonably believe
          there is fraud, a security risk, a threat to safety, or a material
          breach of these Terms. Where the issue is correctable, we will give
          you an opportunity to fix it. We may terminate an account for repeated
          or serious breach, or where a customer relationship has ended and no
          work orders remain.
        </P>
        <P>
          On termination, outstanding obligations for work already assigned or
          completed survive, including payment, confidentiality, and the
          limitation of liability in section 13.
        </P>
      </>
    ),
  },
  {
    id: "changes",
    title: "16. Changes to these Terms",
    content: (
      <>
        <P>
          We may update these Terms to reflect changes in the Platform, our
          operations, or the law. The &quot;Last updated&rdquo; date at the top
          of this page shows the current version.
        </P>
        <P>
          Where a change is material, we will give reasonable notice before it
          takes effect, by in-app notice, email, or a notice on the Platform.
          Changes apply from the effective date stated. Continuing to use the
          Platform after that date means you accept the updated Terms. If you do
          not accept them, you may close your account.
        </P>
      </>
    ),
  },
  {
    id: "contact-terms",
    title: "17. Contact",
    content: (
      <>
        <P>
          Questions about these Terms can be raised with our team. Please
          include your account email and the subject of the work order where
          relevant, so we can act on your query quickly.
        </P>
        <P>
          Privacy requests should be directed through the channels described in
          our{" "}
          <a
            href="/privacy"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Privacy Policy
          </a>
          . Security reports should follow the process in our{" "}
          <a
            href="/security"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Security overview
          </a>
          .
        </P>
      </>
    ),
  },
];

export const metadata: Metadata = createMetadata({
  title: "Terms of Service",
  description:
    "The terms that govern how customers, vendors, technicians, and administrators use Field Nexus, including work order lifecycles, payments, refunds, and disputes.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      description="The rules that govern how customers, vendors, technicians, and administrators use Field Nexus."
      updated="28 September 2026"
      intro={
        <P>
          These Terms explain what each role can do on Field Nexus, how work
          orders move from a request to a completed job, and how payment,
          refunds, and disputes are handled. They are written to be read: if
          anything is unclear, raise it with us before you accept a job.
        </P>
      }
      sections={sections}
    />
  );
}
