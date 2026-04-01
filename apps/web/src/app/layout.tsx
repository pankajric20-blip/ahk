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

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aihkya.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "AihKya - India ka AI Tools Directory | Hindi mein",
    template: "%s | AihKya",
  },
  description:
    "AihKya — India ka pehla Hindi-first AI tools discovery platform. 200+ AI tools ki Hindi mein reviews, pricing INR mein, aur free tools ki list.",
  keywords: [
    "AI tools India",
    "Hindi AI tools",
    "AI tools in Hindi",
    "best AI tools for Indians",
    "free AI tools India",
    "AI tools price in rupees",
    "ChatGPT alternatives India",
    "AI tools directory India",
  ],
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "hi_IN",
    url: baseUrl,
    siteName: "AihKya",
    title: "AihKya - India ka AI Tools Directory",
    description:
      "India ka pehla Hindi-first AI tools discovery platform. Hindi mein AI tools ki reviews aur guide.",
    images: [
      {
        url: `${baseUrl}/logo.png`,
        width: 512,
        height: 512,
        alt: "AihKya Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "AihKya - India ka AI Tools Directory",
    description: "India ka pehla Hindi-first AI tools discovery platform.",
    images: [`${baseUrl}/logo.png`],
  },
  alternates: {
    canonical: baseUrl,
  },
  other: {
    "llms-txt": `${baseUrl}/llms.txt`,
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
    if (t === 'dark') {
      root.classList.remove('light');
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
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
