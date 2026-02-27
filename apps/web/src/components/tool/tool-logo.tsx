"use client";

import { useState } from "react";

interface ToolLogoProps {
  logoUrl: string | null | undefined;
  name: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
};

export function ToolLogo({ logoUrl, name, size = "md" }: ToolLogoProps) {
  const [imgError, setImgError] = useState(false);

  const showFallback = !logoUrl || imgError;

  if (showFallback) {
    return (
      <span
        className={`font-bold ${sizeClasses[size]} flex items-center justify-center`}
      >
        {name?.charAt(0)?.toUpperCase() ?? "?"}
      </span>
    );
  }

  return (
    <img
      src={logoUrl}
      alt={name}
      className="h-full w-full object-contain p-0.5"
      onError={() => setImgError(true)}
    />
  );
}
