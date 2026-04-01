import Link from "next/link";
import { Home, Search, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Page Not Found - AihKya",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="mb-6">
        <span className="text-8xl font-black text-primary/20 select-none">
          404
        </span>
      </div>

      <h1 className="text-3xl font-bold mb-3">Page Not Found</h1>
      <p className="text-muted-foreground max-w-sm mb-8">
        यह पेज मौजूद नहीं है। शायद आपने गलत URL डाला हो, या यह पेज हटा दिया गया
        हो।
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground h-10 px-6 text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <Home className="h-4 w-4" />
          Go Home
        </Link>
        <Link
          href="/search"
          className="inline-flex items-center justify-center gap-2 rounded-md border bg-background h-10 px-6 text-sm font-medium hover:bg-accent transition-colors"
        >
          <Search className="h-4 w-4" />
          Search Tools
        </Link>
        <Link
          href="/categories"
          className="inline-flex items-center justify-center gap-2 rounded-md border bg-background h-10 px-6 text-sm font-medium hover:bg-accent transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Browse Categories
        </Link>
      </div>
    </div>
  );
}
