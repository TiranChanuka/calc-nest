"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { getAppLogo, getAppLogoAlt, getAppName } from "@/lib/config";

interface LogoProps {
  className?: string;
  showText?: boolean;
  textClassName?: string;
  imageClassName?: string;
  size?: "sm" | "md" | "lg" | "xl";
  href?: string;
  fallbackIcon?: React.ComponentType<{ className?: string }>;
}

const sizeConfig = {
  sm: { width: 24, height: 24, textSize: "text-sm", iconSize: "w-4 h-4" },
  md: { width: 32, height: 32, textSize: "text-base", iconSize: "w-5 h-5" },
  lg: { width: 40, height: 40, textSize: "text-lg", iconSize: "w-6 h-6" },
  xl: { width: 48, height: 48, textSize: "text-xl", iconSize: "w-8 h-8" },
};

export default function Logo({
  className = "",
  showText = true,
  textClassName = "",
  imageClassName = "",
  size = "md",
  href = "/",
  fallbackIcon: FallbackIcon = Heart,
}: LogoProps) {
  const config = sizeConfig[size];
  const logoPath = getAppLogo();
  const logoAlt = getAppLogoAlt();
  const appName = getAppName();

  // Check if we should use custom logo (any valid path)
  const hasCustomLogo = logoPath && logoPath.trim() !== "";

  const LogoContent = () => (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Image or Fallback Icon */}
      <div className="relative flex-shrink-0">
        {hasCustomLogo ? (
          <Image
            src={logoPath}
            alt={logoAlt}
            width={config.width}
            height={config.height}
            className="object-contain rounded-lg"
            priority
            onError={(e) => {
              console.error("Logo failed to load:", logoPath);
              // Hide the broken image and show fallback
              e.currentTarget.style.display = "none";
              const fallbackDiv = e.currentTarget.nextSibling as HTMLElement;
              if (fallbackDiv) fallbackDiv.style.display = "flex";
            }}
          />
        ) : null}

        {/* Fallback Icon - always rendered but hidden if custom logo loads */}
        <div
          className={`${
            hasCustomLogo ? "hidden" : "flex"
          } w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl items-center justify-center shadow-lg border border-white/20 ${imageClassName}`}
          style={{ display: hasCustomLogo ? "none" : "flex" }}
        >
          <FallbackIcon
            className={`${config.iconSize} text-white drop-shadow-sm`}
          />
        </div>
      </div>

      {/* App Name Text (optional) - responsive visibility */}
      {showText && (
        <span
          className={`font-bold ${config.textSize} ${textClassName} hidden md:block`}
        >
          {appName}
        </span>
      )}
    </div>
  );

  // If href is provided, wrap in Link
  if (href) {
    return (
      <Link href={href} className="inline-flex">
        <LogoContent />
      </Link>
    );
  }

  return <LogoContent />;
}
