import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/global/navbar";
import { Footer } from "@/components/global/footer";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ToasterWrapper } from "@/components/global/toaster-wrapper";
import { ClientAuthRefresh } from "@/components/global/client-auth-refresh";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AihKya - Discover AI Tools",
  description:
    "India's first Hindi-first AI tools discovery and learning platform.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi" suppressHydrationWarning>
      <head>
        {/* Synchronously apply saved theme before React hydrates to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  try {
    var t = localStorage.getItem('user_theme');
    var root = document.documentElement;
    if (t === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }
  } catch(e) {}
})();
`,
          }}
        />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col bg-background text-foreground`}
      >
        <ThemeProvider>
          <LanguageProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </LanguageProvider>
          <ToasterWrapper />
          <ClientAuthRefresh />
        </ThemeProvider>
      </body>
    </html>
  );
}
