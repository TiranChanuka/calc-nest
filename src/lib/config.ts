/**
 * Application configuration constants from environment variables
 */
export const APP_CONFIG = {
  name: process.env.NEXT_PUBLIC_APP_NAME || "Health Calc",
  tagline: process.env.NEXT_PUBLIC_APP_TAGLINE || "Wellness Tools",
  logo: process.env.NEXT_PUBLIC_APP_LOGO || "",
  logoAlt: process.env.NEXT_PUBLIC_APP_LOGO_ALT || "App Logo",
  fullTitle: `${
    process.env.NEXT_PUBLIC_APP_NAME || "Health Calc"
  } | Complete Health Tools`,
} as const;

/**
 * Get the application name
 */
export const getAppName = () => APP_CONFIG.name;

/**
 * Get the application tagline
 */
export const getAppTagline = () => APP_CONFIG.tagline;

/**
 * Get the application logo path
 */
export const getAppLogo = () => APP_CONFIG.logo;

/**
 * Get the application logo alt text
 */
export const getAppLogoAlt = () => APP_CONFIG.logoAlt;

/**
 * Get the full application title
 */
export const getAppTitle = () => APP_CONFIG.fullTitle;
