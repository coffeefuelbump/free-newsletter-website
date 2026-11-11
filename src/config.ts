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

  // Main headline
  headlineStart: "Stay ahead with",
  headlineAccent: "insights that matter.",

  // Description below headline
  subheadline:
    "Get the latest AI news, industry trends, and ideas you can use, delivered to your inbox every week.",

  // Button text
  signupTitle: "Get the newsletter",
  buttonText: "Subscribe now",
  buttonLoadingText: "Subscribing…",

  // Success message after subscribing
  successTitle: "You're on the list!",
  successMessage:
    "Thanks for subscribing. We'll send you our best content straight to your inbox.",

  // Footer
  footerText: `© ${new Date().getFullYear()} Newsletter. All rights reserved.`,
  privacyNote: "Unsubscribe anytime.",

  // Features section
  features: [
    {
      icon: "✦",
      title: "AI news",
      description: "Key updates from the world of AI",
    },
    {
      icon: "↗",
      title: "Industry trends",
      description: "What’s changing and why it matters",
    },
    {
      icon: "✓",
      title: "Actionable ideas",
      description: "Strategies to try in your own work",
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
  bgPrimary: "#f7f6fa",
  bgSecondary: "#ffffff",
  bgTertiary: "#fbfafd",

  // Accent colors (your brand color!)
  accentPrimary: "#5d25bb",
  accentSecondary: "#e9ddff",

  // Text colors
  textPrimary: "#20172b",
  textSecondary: "#62596d",
  textMuted: "#6f657a",

  // Other colors
  borderColor: "#e3deea",
  success: "#157349",
  error: "#a92e47",
};

// ============================================
// 🔤 FONTS - Change your typography
// ============================================
// Google Fonts are already set up! Just change the names here.
// Find fonts at: https://fonts.google.com
export const fonts = {
  // Display font for the accented headline
  heading: "'Instrument Serif', Georgia, serif",

  // Main font for copy, headings, and form controls
  body: "'DM Sans', system-ui, sans-serif",
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
