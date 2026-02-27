import { Send, Globe, FileText, Tag, DollarSign } from "lucide-react";

export const metadata = {
  title: "Submit a Tool | Aihkya",
  description:
    "Submit your AI tool to be listed on Aihkya — India's first Hindi-first AI tools directory.",
};

export default function SubmitToolPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      {/* Header */}
      <div className="mb-10 text-center">
        <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 border border-primary/20 text-primary mb-4">
          <Send className="h-6 w-6" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-3">
          Submit a Tool
        </h1>
        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          Know a great AI tool? Submit it to our directory and help the Indian
          developer and creator community discover it.
        </p>
      </div>

      {/* Form Card */}
      <div className="rounded-2xl border bg-card p-8 shadow-sm space-y-6">
        {/* Tool Name */}
        <div className="space-y-2">
          <label
            htmlFor="tool-name"
            className="flex items-center gap-2 text-sm font-medium"
          >
            <FileText className="h-4 w-4 text-primary" />
            Tool Name <span className="text-destructive">*</span>
          </label>
          <input
            id="tool-name"
            type="text"
            placeholder="e.g. ChatGPT, Midjourney, Canva AI"
            className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition"
          />
        </div>

        {/* Website URL */}
        <div className="space-y-2">
          <label
            htmlFor="website-url"
            className="flex items-center gap-2 text-sm font-medium"
          >
            <Globe className="h-4 w-4 text-primary" />
            Website URL <span className="text-destructive">*</span>
          </label>
          <input
            id="website-url"
            type="url"
            placeholder="https://example.com"
            className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition"
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label
            htmlFor="category"
            className="flex items-center gap-2 text-sm font-medium"
          >
            <Tag className="h-4 w-4 text-primary" />
            Category <span className="text-destructive">*</span>
          </label>
          <select
            id="category"
            className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition"
          >
            <option value="">Select a category...</option>
            <option>Text Generation</option>
            <option>Image Generation</option>
            <option>Video Generation</option>
            <option>Audio & Music</option>
            <option>Code & Development</option>
            <option>Data & Analytics</option>
            <option>Productivity</option>
            <option>Content Creation</option>
            <option>Education</option>
            <option>Other</option>
          </select>
        </div>

        {/* Pricing Model */}
        <div className="space-y-2">
          <label
            htmlFor="pricing"
            className="flex items-center gap-2 text-sm font-medium"
          >
            <DollarSign className="h-4 w-4 text-primary" />
            Pricing Model <span className="text-destructive">*</span>
          </label>
          <select
            id="pricing"
            className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition"
          >
            <option value="">Select pricing...</option>
            <option>Free</option>
            <option>Freemium</option>
            <option>Paid</option>
            <option>Free Trial</option>
            <option>Open Source</option>
          </select>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label
            htmlFor="description"
            className="flex items-center gap-2 text-sm font-medium"
          >
            <FileText className="h-4 w-4 text-primary" />
            Short Description (English){" "}
            <span className="text-destructive">*</span>
          </label>
          <textarea
            id="description"
            rows={3}
            placeholder="Briefly describe what this tool does and what makes it useful..."
            className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition resize-none"
          />
        </div>

        {/* Hindi Description (optional) */}
        <div className="space-y-2">
          <label
            htmlFor="description-hi"
            className="flex items-center gap-2 text-sm font-medium"
          >
            <FileText className="h-4 w-4 text-primary" />
            Short Description (Hindi){" "}
            <span className="text-muted-foreground text-xs font-normal">
              — optional
            </span>
          </label>
          <textarea
            id="description-hi"
            rows={2}
            placeholder="हिंदी में संक्षिप्त विवरण..."
            className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition resize-none"
          />
        </div>

        {/* Submitter email */}
        <div className="space-y-2">
          <label
            htmlFor="submitter-email"
            className="flex items-center gap-2 text-sm font-medium"
          >
            Your Email{" "}
            <span className="text-muted-foreground text-xs font-normal">
              — for follow-up
            </span>
          </label>
          <input
            id="submitter-email"
            type="email"
            placeholder="you@example.com"
            className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition"
          />
        </div>

        {/* Submit Button */}
        <button
          type="button"
          className="w-full h-11 flex items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          onClick={() =>
            alert("Thank you! We'll review your submission and add it shortly.")
          }
        >
          <Send className="h-4 w-4" />
          Submit for Review
        </button>

        <p className="text-xs text-muted-foreground text-center">
          All submissions are reviewed by our team before being listed. We
          typically respond within 2–3 business days.
        </p>
      </div>
    </div>
  );
}
