import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Mini Tools - Free Online AI Tools | AihKya",
  description:
    "Free AI-powered mini tools: Hindi Text-to-Speech, language translator, and more. Use directly in browser — no sign up needed.",
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
