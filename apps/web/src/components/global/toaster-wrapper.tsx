"use client";

import { Toaster } from "sonner";
import { useTheme } from "@/contexts/ThemeContext";

export function ToasterWrapper() {
  const { theme } = useTheme();
  return <Toaster theme={theme} richColors position="top-center" />;
}
