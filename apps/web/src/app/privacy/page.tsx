export const metadata = {
  title: "Privacy Policy | Aihkya",
  description:
    "Privacy Policy for Aihkya — India's Hindi-first AI tools directory.",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-4xl font-bold tracking-tight mb-2">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-10">
        Last updated: February 2026
      </p>

      <div className="prose prose-sm dark:prose-invert max-w-none space-y-8 text-sm text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            1. Information We Collect
          </h2>
          <p>
            When you create an account, we collect your email address and,
            optionally, your name. If you sign in with Google, we receive your
            name and email from Google. We also collect usage data such as tools
            you bookmark, searches you perform, and pages you visit to improve
            our recommendations.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>To operate and improve the Aihkya platform.</li>
            <li>
              To personalise your experience (e.g., saved tools on your
              dashboard).
            </li>
            <li>To send you product updates if you opt in.</li>
            <li>
              We do <strong>not</strong> sell your personal data to third
              parties.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            3. Data Storage
          </h2>
          <p>
            Your data is stored securely with{" "}
            <a
              href="https://supabase.com"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Supabase
            </a>{" "}
            (PostgreSQL database hosted on AWS). We take reasonable steps to
            protect your data from unauthorised access.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            4. Cookies
          </h2>
          <p>
            We use essential session cookies to keep you logged in. We do not
            use third-party advertising cookies.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            5. Your Rights
          </h2>
          <p>
            You can request deletion of your account and all associated data at
            any time by emailing{" "}
            <a
              href="mailto:privacy@aihkya.com"
              className="text-primary hover:underline"
            >
              privacy@aihkya.com
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            6. Changes
          </h2>
          <p>
            We may update this policy from time to time. Continued use of the
            platform after changes constitutes acceptance of the updated policy.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            7. Contact
          </h2>
          <p>
            Questions? Contact us at{" "}
            <a
              href="mailto:privacy@aihkya.com"
              className="text-primary hover:underline"
            >
              privacy@aihkya.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
