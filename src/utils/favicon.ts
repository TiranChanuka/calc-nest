/**
 * Favicon configuration utility
 * Uses environment variables to configure favicon paths
 */

export interface FaviconConfig {
  icon: Array<{
    url: string;
    sizes?: string;
    type?: string;
  }>;
  shortcut: string;
  apple: Array<{
    url: string;
    sizes?: string;
    type?: string;
  }>;
}

export function getFaviconConfig(): FaviconConfig {
  const appLogo = process.env.NEXT_PUBLIC_APP_LOGO || "/favicon.ico";

  return {
    icon: [
      {
        url: appLogo,
        sizes: "32x32",
        type: "image/png",
      },
    ],
    shortcut: appLogo,
    apple: [
      {
        url: appLogo,
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}

/**
 * Get the primary favicon URL
 */
export function getFaviconUrl(): string {
  return process.env.NEXT_PUBLIC_APP_LOGO || "/favicon.ico";
}

/**
 * Get the Apple touch icon URL
 */
export function getAppleTouchIconUrl(): string {
  return process.env.NEXT_PUBLIC_APP_LOGO || "/apple-touch-icon.png";
}
