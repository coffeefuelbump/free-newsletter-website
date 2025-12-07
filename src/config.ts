// ============================================
// 🎨 NEWSLETTER CONFIGURATION
// ============================================
// Edit this file to customize your newsletter landing page!
// No coding experience needed - just change the values below.

// ============================================
// 📝 CONTENT - Change your text here
// ============================================
export const content = {
  // Logo & Branding
  logoIcon: "◈",
  logoText: "Newsletter",

  // Badge above headline
  badgeText: "Join 1,000 subscribers",

  // Main headline (the accent part gets the gradient color)
  headlineStart: "Stay ahead with",
  headlineAccent: " insights that matter",

  // Description below headline
  subheadline:
    "Get exclusive content, industry trends, and actionable strategies delivered to your inbox every week. No spam, just value.",

  // Button text
  buttonText: "Subscribe Now",
  buttonLoadingText: "Subscribing...",

  // Success message after subscribing
  successTitle: "You're on the list!",
  successMessage:
    "Thanks for subscribing. We'll send you our best content straight to your inbox.",

  // Footer
  footerText: "© 2025 Newsletter. All rights reserved.",
  privacyNote: "By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.",

  // Features section
  features: [
    {
      icon: "🤖",
      title: "AI News",
      description: "Latest AI trends and updates",
    },
    {
      icon: "☕",
      title: "I Love Coffee",
      description: "Fueled by caffeine",
    },
    {
      icon: "👍",
      title: "Make sure to leave like",
      description: "Support the content",
    },
  ],
};

// ============================================
// 📋 REFERRAL SOURCES - Where users found you
// ============================================
// Add or remove options from this list
export const referralSources = [
  "Select an option",
  "Google Search",
  "YouTube",
  "Twitter / X",
  "LinkedIn",
  "Friend or Colleague",
  "Podcast",
  "Newsletter",
  "Blog Article",
  "Other",
];

// ============================================
// 🎨 COLORS - Customize your theme
// ============================================
// These colors will automatically update your entire site!
// Use hex colors like "#ff0000" or rgb like "rgb(255, 0, 0)"
export const colors = {
  // Background colors
  bgPrimary: "#0a0a0b",      // Main background (darkest)
  bgSecondary: "#111113",    // Card/input background
  bgTertiary: "#1a1a1d",     // Badge/hover background

  // Accent colors (your brand color!)
  accentPrimary: "#a855f7",   // Main accent (purple)
  accentSecondary: "#c084fc", // Lighter accent for gradients

  // Text colors
  textPrimary: "#fafafa",    // Main text (brightest)
  textSecondary: "#a1a1aa",  // Subheadline text
  textMuted: "#71717a",      // Placeholder/footer text

  // Other colors
  borderColor: "#27272a",    // Border/divider color
  success: "#22c55e",        // Success green
  error: "#ef4444",          // Error red
};

// ============================================
// 🔤 FONTS - Change your typography
// ============================================
// Google Fonts are already set up! Just change the names here.
// Find fonts at: https://fonts.google.com
export const fonts = {
  // Heading font (used for headlines, buttons, logo)
  heading: "'Orbitron', sans-serif",

  // Body font (used for paragraphs, inputs, labels)
  body: "'Rajdhani', sans-serif",
};

// ============================================
// 📤 WEBHOOK PAYLOAD - Data sent to Zapier
// ============================================
// This function creates the data sent to your Zapier webhook.
// Add more fields here to collect additional data!
//
// EXAMPLE: To add a "name" field:
// 1. Add a name input field in App.tsx (see README)
// 2. Pass the name value to this function
// 3. Add it to the return object below
//
export const createWebhookPayload = (data: {
  email: string;
  phone: string;
  source: string;
}) => {
  return {
    // Required fields
    email: data.email,
    phone: data.phone,
    source: data.source,

    // Automatic fields (you can remove these if not needed)
    timestamp: new Date().toISOString(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
};
