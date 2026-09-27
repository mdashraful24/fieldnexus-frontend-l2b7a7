import LegalPage, {
  BulletList,
  type LegalSection,
  Note,
  P,
} from "@/components/modules/legal/LegalPage";

const sections: LegalSection[] = [
  {
    id: "overview",
    title: "1. Our approach",
    content: (
      <>
        <P>
          Field Nexus holds information that matters: where people are, when
          they are expecting a technician, who is trusted to enter their home or
          workplace, and how money moves between them. We treat protecting that
          information as part of the product, not as a policy added afterwards.
        </P>
        <P>
          This page describes the controls we actually operate today. Where a
          control is planned rather than in place, we say so. We would rather be
          precise about our current state than claim more than we can evidence.
        </P>
        <Note>
          Field Nexus is not yet independently audited to a formal certification
          such as SOC 2 or ISO 27001, and we do not claim to be. This page
          describes our own engineering practices.
        </Note>
      </>
    ),
  },
  {
    id: "access-control",
    title: "2. Access control",
    content: (
      <>
        <P>
          Access to Field Nexus is role-based. A session grants exactly one
          role, and each role can reach only the routes and records it needs:
        </P>
        <BulletList
          items={[
            "Customers see their own work orders, payments, and profile.",
            "Technicians see the work orders assigned to them, with the customer contact and site details needed to complete the job.",
            "Vendors see the work orders for their organisation and manage their own technician members.",
            "Administrators review requests, approve applications, and assign work.",
            "Super Administrators manage administrators and oversee the platform.",
          ]}
        />
        <P>
          Access is granted on a least-privilege basis and is re-checked on
          every request against the authenticated role, not only at sign-in.
          Administrative endpoints are not reachable with a customer or
          technician session.
        </P>
      </>
    ),
  },
  {
    id: "authentication",
    title: "3. Authentication and account security",
    content: (
      <>
        <P>We operate the following controls today:</P>
        <BulletList
          items={[
            "Passwords are hashed with bcrypt using a configurable salt round count. We never store or log a password in plain text.",
            "Login, registration, and one-time-code endpoints are rate limited, to slow down credential stuffing and automated abuse.",
            "Email verification is required before an account can be used, which limits the impact of mass sign-ups from throwaway addresses.",
            "Passwords can be reset through a verified one-time code, and the code is rate limited to prevent guessing.",
            "Sessions are issued as time-limited tokens, and signing out invalidates the client session.",
            "Account state is enforced. Blocking or deleting a user stops them from operating, and technician or vendor approval is revoked separately from account creation.",
          ]}
        />
        <P>
          Sign-in with a supported third-party identity provider is also
          available, and is subject to that provider&rsquo;s own security
          posture.
        </P>
        <Note>
          Multi-factor authentication is not currently offered. Until it is, we
          strongly recommend a unique, long password that is not reused anywhere
          else, and that you do not share your account with anyone.
        </Note>
      </>
    ),
  },
  {
    id: "platform-hardening",
    title: "4. Platform hardening",
    content: (
      <>
        <P>
          Our API sets standard security headers through Helmet, which reduces
          the impact of common injection and content-sniffing attacks. Request
          bodies are size limited, input is validated against a schema before it
          reaches business logic, and queries are parameterised through our
          database layer rather than built by string concatenation.
        </P>
        <P>
          Secrets, database credentials, and gateway keys are held in
          environment configuration and are never committed to source. Errors
          returned to clients are generic; diagnostic detail is kept server-side
          and out of API responses, so that a failed request does not disclose
          schema or infrastructure information.
        </P>
      </>
    ),
  },
  {
    id: "data-protection",
    title: "5. Data protection",
    content: (
      <>
        <P>
          Data in transit is protected with TLS. Data is stored through a
          managed database with access limited to the services that need it, and
          production access is separated from development.
        </P>
        <P>
          Payment credentials never reach our servers. bKash transactions are
          completed on the gateway, and we persist only the resulting record:
          amount, currency, gateway reference, status, and timestamp. We do not
          store a PIN, OTP, or full gateway account number.
        </P>
        <P>
          Verification documents submitted by technicians and vendors, which can
          include identity and tax records, are stored separately from routine
          profile data and are accessible only to those handling approval and
          compliance.
        </P>
      </>
    ),
  },
  {
    id: "audit-logs",
    title: "6. Audit logging",
    content: (
      <>
        <P>
          Administrative and platform actions are written to an append-only
          audit trail. Each entry records who acted, what they acted on, when it
          happened, the source IP address, and the values before and after the
          change.
        </P>
        <P>Audit entries are created for actions including:</P>
        <BulletList
          items={[
            "Approving or rejecting a technician application.",
            "Approving, assigning, reassigning, or cancelling a work order.",
            "Changing a user or administrator status.",
            "Vendor approval and suspension.",
            "Changes to service categories and platform configuration.",
          ]}
        />
        <P>
          This is what makes a dispute resolvable. When a customer asks why a
          job was reassigned, or a vendor asks why an application was rejected,
          the answer is a record rather than a recollection. Audit logs are
          retained after an account is closed.
        </P>
      </>
    ),
  },
  {
    id: "responsible-disclosure",
    title: "7. Reporting a vulnerability",
    content: (
      <>
        <P>
          If you believe you have found a security issue, please report it
          through the contact route for your account rather than disclosing it
          publicly. Include what you did, what you expected, the impact you
          believe it has, and any steps to reproduce.
        </P>
        <P>What we ask of researchers:</P>
        <BulletList
          items={[
            "Give us reasonable time to investigate and fix the issue before public disclosure.",
            "Avoid accessing data that is not yours, or disrupting other users.",
            "Do not use social engineering, denial-of-service testing, or physical attacks.",
            "Report the issue once and allow us time to confirm the fix.",
          ]}
        />
        <P>
          We will acknowledge a valid report, keep you informed as we work on
          it, and tell you when it is resolved. We will not pursue legal action
          against research that follows this process in good faith.
        </P>
      </>
    ),
  },
  {
    id: "incident-response",
    title: "8. Incident response",
    content: (
      <>
        <P>
          If we identify a breach or a compromise of your account, our priority
          order is to contain it, then to preserve the evidence, then to restore
          service, and only then to notify affected parties.
        </P>
        <P>
          Where we confirm that your personal data was affected, we will inform
          you and the relevant authority as required by applicable law, describe
          what was involved, and tell you the steps we recommend you take. For a
          compromised account we will advise you to reset your password and
          revoke any active sessions.
        </P>
      </>
    ),
  },
  {
    id: "our-responsibilities",
    title: "9. What we ask of you",
    content: (
      <>
        <P>
          Most account compromises trace back to a weak or reused password
          rather than a flaw in the Platform. These habits remove most of that
          risk:
        </P>
        <BulletList
          items={[
            "Use a unique password of at least 12 characters, and never reuse a password from another service.",
            "Never share a technician login. Each named technician should have their own account, so that work is correctly attributable.",
            "Treat an unexpected login prompt or one-time code request as suspicious, and do not approve a code you did not initiate.",
            "Report unexpected assignments, status changes, or payments on your account immediately.",
            "Keep customer site details accurate, and confirm who is authorised to be on site.",
          ]}
        />
      </>
    ),
  },
  {
    id: "limitations",
    title: "10. Current limitations",
    content: (
      <>
        <P>
          We would rather list our gaps than let you assume otherwise. The
          following are not in place today:
        </P>
        <BulletList
          items={[
            "Multi-factor authentication for administrator and technician accounts.",
            "An independent third-party penetration test or security certification.",
            "Encryption at rest managed by us; this depends on our database and hosting providers' own controls.",
            "Public disclosure of a formal bug bounty programme.",
          ]}
        />
        <P>
          These are prioritised on our roadmap. If any of them matters to your
          decision to use Field Nexus, please tell us, and we will be direct
          about where we are.
        </P>
      </>
    ),
  },
  {
    id: "security-contact",
    title: "11. Security contact",
    content: (
      <>
        <P>
          Security questions and vulnerability reports are handled by the
          engineering team rather than a general support queue, so that reports
          reach the people who can act on them.
        </P>
        <P>
          For the data we hold and how it is used, see our{" "}
          <a
            href="/privacy"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Privacy Policy
          </a>
          . For the rules governing use of the Platform, see our{" "}
          <a
            href="/terms"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Terms of Service
          </a>
          .
        </P>
      </>
    ),
  },
];

export default function SecurityPage() {
  return (
    <LegalPage
      eyebrow="Trust"
      title="Security"
      description="How Field Nexus protects the work order data, the location data, and the payments that pass through it."
      updated="28 September 2026"
      intro={
        <>
          <P>
            A field service platform is an unusual security problem. It has to
            disclose a customer&rsquo;s address and the nature of a problem to a
            stranger who will knock on their door, and it has to move money
            between that customer and that stranger. Everything below follows
            from those two facts.
          </P>
          <div className="mt-6 grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-3">
            {[
              { label: "Password storage", value: "bcrypt, salted" },
              { label: "Admin actions", value: "Audited with IP + diff" },
              { label: "Auth endpoints", value: "Rate limited" },
            ].map((item) => (
              <div key={item.label} className="bg-card px-4 py-3">
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="mt-1 text-sm font-medium">{item.value}</p>
              </div>
            ))}
          </div>
        </>
      }
      sections={sections}
    />
  );
}
