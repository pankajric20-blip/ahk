export const metadata = {
  title: "Sponsor a Listing | Aihkya",
  description:
    "Promote your AI tool to thousands of Indian creators, developers, and entrepreneurs on Aihkya.",
};

export default function SponsorPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="mb-10 text-center">
        <span className="inline-block text-4xl mb-4">🚀</span>
        <h1 className="text-4xl font-bold tracking-tight mb-3">
          Sponsor a Listing
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Get your AI tool in front of thousands of Indian creators, developers,
          and entrepreneurs — with Hindi-language reach no other directory
          offers.
        </p>
      </div>

      <div className="grid gap-6 mb-12">
        {[
          {
            tier: "Homepage Featured",
            price: "₹4,999 / month",
            perks: [
              "Featured spot on the homepage",
              "Top of category page",
              '"Sponsored" badge on tool card',
              "Priority in search results",
            ],
          },
          {
            tier: "Category Top",
            price: "₹2,499 / month",
            perks: [
              "Top of one category page",
              '"Sponsored" badge on tool card',
              "Category email mention",
            ],
          },
        ].map((plan) => (
          <div
            key={plan.tier}
            className="rounded-2xl border bg-card p-8 shadow-sm flex flex-col md:flex-row md:items-center gap-6"
          >
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-1">{plan.tier}</h2>
              <p className="text-2xl font-semibold text-primary mb-4">
                {plan.price}
              </p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {plan.perks.map((p) => (
                  <li key={p} className="flex items-center gap-2">
                    <span className="text-primary">✓</span> {p}
                  </li>
                ))}
              </ul>
            </div>
            <a
              href="mailto:sponsor@aihkya.com?subject=Sponsorship Enquiry"
              className="shrink-0 h-11 px-6 flex items-center justify-center rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors text-sm"
            >
              Get in touch
            </a>
          </div>
        ))}
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Questions? Email us at{" "}
        <a
          href="mailto:sponsor@aihkya.com"
          className="text-primary hover:underline"
        >
          sponsor@aihkya.com
        </a>
      </p>
    </div>
  );
}
