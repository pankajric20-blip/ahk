export const metadata = {
  title: "Terms of Service | Aihkya",
  description:
    "Terms of Service for Aihkya — India's Hindi-first AI tools directory.",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-4xl font-bold tracking-tight mb-2">
        Terms of Service
      </h1>
      <p className="text-sm text-muted-foreground mb-10">
        Last updated: February 2026
      </p>

      <div className="prose prose-sm dark:prose-invert max-w-none space-y-8 text-sm text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using Aihkya (&quot;the Platform&quot;), you agree
            to be bound by these Terms of Service. If you disagree with any
            part, you may not use the Platform.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            2. Use of the Platform
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>You must be at least 13 years of age to use the Platform.</li>
            <li>
              You agree not to submit false, misleading, or spammy tool
              listings.
            </li>
            <li>
              You agree not to attempt to scrape, reverse-engineer, or disrupt
              the Platform.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            3. Tool Listings
          </h2>
          <p>
            Tool information on Aihkya is curated for informational purposes. We
            do not endorse any listed tool and are not responsible for your
            experience with third-party tools or services. Pricing and feature
            details may change — always verify directly with the tool provider.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            4. User Content
          </h2>
          <p>
            By submitting reviews or tool suggestions, you grant Aihkya a
            non-exclusive, royalty-free licence to display that content on the
            Platform. You are responsible for ensuring your submissions do not
            violate third-party rights.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            5. Intellectual Property
          </h2>
          <p>
            All Platform content (excluding user submissions and third-party
            tool data) is the intellectual property of Aihkya. You may not
            reproduce or redistribute it without prior written permission.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            6. Limitation of Liability
          </h2>
          <p>
            Aihkya is provided &quot;as is&quot; without warranties of any kind.
            We shall not be liable for any indirect, incidental, or
            consequential damages arising from your use of the Platform.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            7. Changes to Terms
          </h2>
          <p>
            We reserve the right to modify these terms at any time. Continued
            use after changes constitutes acceptance of the revised terms.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            8. Contact
          </h2>
          <p>
            Questions about these terms? Email us at{" "}
            <a
              href="mailto:legal@aihkya.com"
              className="text-primary hover:underline"
            >
              legal@aihkya.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
