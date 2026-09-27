import LegalPage, {
  BulletList,
  type LegalSection,
  Note,
  NumberList,
  P,
} from "@/components/modules/legal/LegalPage";

const sections: LegalSection[] = [
  {
    id: "scope",
    title: "1. Scope",
    content: (
      <>
        <P>
          This Privacy Policy explains what personal data Field Nexus collects
          when you use the Platform, why we collect it, who we share it with,
          and what control you have over it.
        </P>
        <P>
          It applies to customers, technicians, vendors, administrators, and
          visitors to our public pages. It does not cover the independent
          websites of the vendors or technicians listed on the Platform; those
          are governed by their own policies.
        </P>
        <Note>
          We only ask for the data the Platform genuinely needs to dispatch,
          deliver, and pay for field service. We do not sell your personal data.
        </Note>
      </>
    ),
  },
  {
    id: "collect",
    title: "2. Information we collect",
    content: (
      <>
        <P>We collect the following categories of data.</P>
        <NumberList
          items={[
            <>
              <strong className="text-foreground">Account data.</strong> Name,
              email address, contact number, password (stored hashed, never in
              plain text), profile image, and account status. For vendors, we
              also collect business name, registration number, and tax
              identification. For administrators, we record the actions they
              take.
            </>,
            <>
              <strong className="text-foreground">Work order data.</strong> The
              category, description, priority, requested schedule, site address,
              and any notes you provide when raising a work order, together with
              the status history and assignment history of that order.
            </>,
            <>
              <strong className="text-foreground">Service reports.</strong> The
              parts used, hours worked, technician notes, and completion outcome
              recorded against a job. These form the authoritative record of
              what work was carried out.
            </>,
            <>
              <strong className="text-foreground">Payment records.</strong> The
              amount, currency, gateway reference, timestamp, and status of each
              payment. We do <em>not</em> collect or store your bKash PIN, OTP,
              or full gateway account credentials.
            </>,
            <>
              <strong className="text-foreground">
                Usage and device data.
              </strong>{" "}
              IP address, browser and device type, pages viewed, referring page,
              and timestamps. We use this to keep the service secure and to
              understand which features are used.
            </>,
            <>
              <strong className="text-foreground">Communications.</strong> The
              content of messages you send us, and notifications we send you
              about assignments, status changes, and payments.
            </>,
            <>
              <strong className="text-foreground">Verification data.</strong>{" "}
              For vendors and technicians, the identity, credential, and
              insurance documents you submit for approval, and the outcome of
              that review.
            </>,
          ]}
        />
      </>
    ),
  },
  {
    id: "use",
    title: "3. Why we use your data",
    content: (
      <>
        <P>We use personal data to:</P>
        <BulletList
          items={[
            "Create and operate your account, and authenticate you when you sign in.",
            "Review vendor and technician applications and decide who may take work.",
            "Route work orders: approve requests, match them to a vendor and technician, and notify those parties.",
            "Share the details a technician needs to reach the site and complete the job.",
            "Process and record payments, issue receipts, and keep payment history for reconciliation.",
            "Record audit logs so that every administrative action can be traced.",
            "Detect and prevent fraud, abuse, and security incidents, and enforce these Terms.",
            "Send service messages about your work orders. These are operational and cannot be switched off while an order is open.",
            "Improve the Platform, including understanding which features are used and where the service is slow.",
            "Send marketing communications, only where you have given us consent. You can withdraw consent at any time.",
            "Meet legal, tax, and accounting obligations, and respond to valid requests from authorities.",
          ]}
        />
        <P>
          We rely on your consent for optional marketing, on performance of a
          contract for the work we do for you, on our legitimate interests in
          operating and securing the Platform, and on legal obligation. Where we
          rely on legitimate interests, we have assessed that the processing is
          necessary and balanced against your rights.
        </P>
      </>
    ),
  },
  {
    id: "sharing",
    title: "4. Who we share your data with",
    content: (
      <>
        <P>
          We share the minimum data needed to deliver a work order.
          Specifically:
        </P>
        <BulletList
          items={[
            <>
              <strong className="text-foreground">
                The assigned technician and vendor.
              </strong>{" "}
              When a work order is assigned, the technician sees the
              customer&rsquo;s name, contact number, site address, the problem
              description, and the access notes needed to complete the job. This
              is the core of the service and you cannot opt out of it for an
              open order.
            </>,
            <>
              <strong className="text-foreground">
                Other customers and vendors on the Platform,
              </strong>{" "}
              but only the public profile information you have chosen to
              publish, such as your name, service categories, rating, and
              completed job count. Your contact details, addresses, and work
              order history are never published.
            </>,
            <>
              <strong className="text-foreground">Administrators,</strong> who
              need access to approve, assign, and resolve work orders and to
              investigate disputes.
            </>,
            <>
              <strong className="text-foreground">
                The bKash payment gateway,
              </strong>{" "}
              to process the transaction. The gateway handles your payment
              credentials; we receive only the resulting payment record.
            </>,
            <>
              <strong className="text-foreground">Service providers,</strong>{" "}
              who host our infrastructure, send email and notifications, or
              provide support tooling, under contract and only on our
              instructions.
            </>,
            <>
              <strong className="text-foreground">
                Authorities or other parties,
              </strong>{" "}
              where disclosure is required by law, needed to protect the safety
              of users, or necessary to establish or defend legal claims.
            </>,
          ]}
        />
        <P>
          We do not sell your personal data, and we do not share it for
          advertising purposes. We do not share full technician or vendor
          verification documents outside our approval and compliance functions.
        </P>
      </>
    ),
  },
  {
    id: "cookies",
    title: "5. Cookies and local storage",
    content: (
      <>
        <P>
          We use cookies and browser storage to keep you signed in and to
          remember interface preferences. Because these are used for
          authentication, they are strictly necessary and cannot be disabled
          without breaking sign-in.
        </P>
        <P>
          If we introduce analytics or marketing cookies, we will ask for
          consent first and you will be able to change that choice. You can
          clear cookies and stored data in your browser at any time, though
          doing so will sign you out.
        </P>
      </>
    ),
  },
  {
    id: "security",
    title: "6. How we protect your data",
    content: (
      <>
        <P>
          We apply access controls based on role, so customers, technicians,
          vendors, and administrators each see only what their role permits.
          Administrative actions are written to an audit trail. Data is
          transmitted over encrypted connections, and passwords are stored
          hashed rather than in plain text.
        </P>
        <P>
          These controls, our development practices, and how to report a
          vulnerability are described in our{" "}
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
  {
    id: "retention",
    title: "7. How long we keep your data",
    content: (
      <>
        <P>
          We keep personal data for as long as your account is active, and then
          for as long as needed for the purposes below:
        </P>
        <BulletList
          items={[
            "Work orders, service reports, and assignment history are retained for the life of the order plus a defined archival period, because they are the record of what was agreed and delivered.",
            "Payment records are retained for the period required by Bangladeshi accounting, tax, and anti-money-laundering law, even after an account closes.",
            "Audit logs are retained so that administrative actions remain traceable after the fact.",
            "Verification documents are retained while your account is active and for a compliance period afterwards, then securely deleted.",
            "Account profile data is deleted or anonymised when you close your account, except for the categories above that we must retain.",
          ]}
        />
        <P>
          When data is no longer needed, we delete it or anonymise it so that it
          can no longer be linked to you.
        </P>
      </>
    ),
  },
  {
    id: "rights",
    title: "8. Your rights and choices",
    content: (
      <>
        <P>Subject to applicable law, you can ask us to:</P>
        <BulletList
          items={[
            "Confirm what personal data we hold about you, and give you a copy.",
            "Correct anything inaccurate or incomplete.",
            "Delete your account and the personal data that is not subject to a retention requirement.",
            "Restrict or object to processing based on legitimate interests.",
            "Withdraw consent, where we rely on it.",
            "Receive your data in a portable, machine-readable format.",
          ]}
        />
        <P>
          Raise a request through the contact route below, or from within your
          account where that option is available. We will verify your identity
          before acting so that we do not disclose your data to someone else. We
          aim to respond within 30 days.
        </P>
        <P>
          Some profile information is shown publicly as part of your role on the
          Platform, such as your name and rating. You can control what appears
          on your public profile. Removing a rating removes it from public view,
          but the underlying completed job record is retained as described in
          section 7.
        </P>
        <P>
          If you are not satisfied with our response, you may escalate to our
          management, or complain to the relevant data protection authority.
        </P>
      </>
    ),
  },
  {
    id: "security-of-data",
    title: "9. Personal data security",
    content: (
      <>
        <P>
          We apply the same care to all personal data, but no method of
          transmission or storage is completely secure. You are responsible for
          keeping your own credentials confidential and for the accuracy of the
          information you submit.
        </P>
        <P>
          If you believe an account has been accessed without authorisation,
          change your password immediately and tell us through the contact route
          below.
        </P>
      </>
    ),
  },
  {
    id: "children",
    title: "10. Children",
    content: (
      <>
        <P>
          The Platform is a business service and is not directed at children. We
          do not knowingly collect personal data from anyone under 18. If you
          believe a child has provided us personal data, tell us and we will
          delete it.
        </P>
      </>
    ),
  },
  {
    id: "transfers",
    title: "11. International transfers",
    content: (
      <>
        <P>
          Field Nexus operates in Bangladesh. Some service providers we use may
          process data on servers located outside Bangladesh. Where that
          happens, we rely on appropriate safeguards, such as contractual
          clauses, to protect your data. We will identify any material change to
          where your data is hosted.
        </P>
      </>
    ),
  },
  {
    id: "changes-privacy",
    title: "12. Changes to this policy",
    content: (
      <>
        <P>
          We may update this policy as the Platform or the law changes. The
          &quot;Last updated&rdquo; date at the top shows the current version.
          For a material change that affects how we use your data, we will give
          reasonable notice before it takes effect.
        </P>
      </>
    ),
  },
  {
    id: "contact-privacy",
    title: "13. Contact us",
    content: (
      <>
        <P>
          For any privacy question, access request, or complaint, contact our
          team and tell us which account and work order are involved. We will
          route your request to the person who can act on it.
        </P>
        <P>
          If your concern is a security vulnerability rather than a privacy
          request, please use the reporting process in our{" "}
          <a
            href="/security"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Security overview
          </a>
          , which is designed to reach our engineers directly.
        </P>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      description="What personal data Field Nexus collects, why we need it, who we share it with, and how you control it."
      updated="28 September 2026"
      intro={
        <P>
          This policy covers everyone who uses Field Nexus. It is written around
          one idea: a field service platform has to share a customer&rsquo;s
          address and problem with the technician who is coming to fix it. We
          have tried to be precise about exactly what that means, and about
          everything else we touch.
        </P>
      }
      sections={sections}
    />
  );
}
