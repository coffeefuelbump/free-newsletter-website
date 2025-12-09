# 📬 Newsletter Signup Landing Page

<img width="2024" height="1177" alt="Screenshot 2025-12-09 at 9 14 16 AM" src="https://github.com/user-attachments/assets/4d914edf-abea-47e2-b786-85486ee3bf77" />


## 🌟 Connect & Learn More

[![Join AI Community](https://img.shields.io/badge/🚀_Join-AI_Community_(FREE)-4F46E5?style=for-the-badge)](https://www.skool.com/ai-for-your-business)
[![GitHub Profile](https://img.shields.io/badge/GitHub-Follow%20me%20for%20more%20free%20source%20code-181717?style=for-the-badge&logo=github)](https://github.com/coffeefuelbump)
[![Link Tree](https://img.shields.io/badge/Linktree-Everything-green?style=for-the-badge&logo=linktree&logoColor=white)](https://linktr.ee/corbin_brown)
[![YouTube Membership](https://img.shields.io/badge/YouTube-Become%20a%20Builder%20%26%20get%20perks-red?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/channel/UCJFMlSxcvlZg5yZUYJT0Pug/join)
[![Twitter Follow](https://img.shields.io/badge/Twitter-Follow%20@corbin__braun-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/corbin_braun)

---

A beautiful, modern newsletter signup page with Zapier webhook integration. **Beginner-friendly** - customize everything from one config file!

## ✨ Features

- 📧 **Email Collection** - Validate and collect subscriber emails
- 📊 **Referral Tracking** - Track where subscribers found you
- 🎨 **Easy Customization** - Change colors, fonts, and text from one file
- 🔗 **Zapier Integration** - Send data to any app via webhooks
- 📱 **Responsive Design** - Looks great on all devices
- ⚡ **Fast** - Built with Vite + React

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Your Zapier Webhook

Create a `.env` file in the project root:

```env
VITE_ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/YOUR_ID/YOUR_HOOK/
```

> 💡 Get your webhook URL from Zapier by creating a new Zap with "Webhooks by Zapier" → "Catch Hook" trigger.

### 3. Run the Development Server

```bash
npm run dev
```

Open http://localhost:5173 in your browser!

---

## 🎨 Customization Guide

**All customization is done in one file: `src/config.ts`**

### Change Colors

Open `src/config.ts` and find the `colors` section:

```typescript
export const colors = {
  // Background colors
  bgPrimary: "#0a0a0b",      // Main background
  bgSecondary: "#111113",    // Card background
  
  // Accent colors (your brand color!)
  accentPrimary: "#f59e0b",   // Change this to your brand color!
  accentSecondary: "#fbbf24", // Lighter version for gradients
  
  // Text colors
  textPrimary: "#fafafa",    // Main text
  textSecondary: "#a1a1aa",  // Subtext
  // ... more colors
};
```

**Popular color combinations:**

| Theme | Primary | Secondary |
|-------|---------|-----------|
| 🟠 Amber (default) | `#f59e0b` | `#fbbf24` |
| 🔵 Blue | `#3b82f6` | `#60a5fa` |
| 🟣 Purple | `#8b5cf6` | `#a78bfa` |
| 🟢 Green | `#10b981` | `#34d399` |
| 🔴 Red | `#ef4444` | `#f87171` |
| 🩷 Pink | `#ec4899` | `#f472b6` |

### Change Fonts

Find the `fonts` section in `src/config.ts`:

```typescript
export const fonts = {
  heading: "'Syne', sans-serif",     // Headlines & buttons
  body: "'DM Sans', sans-serif",     // Body text
};
```

**To use different Google Fonts:**

1. Go to [fonts.google.com](https://fonts.google.com)
2. Select your fonts
3. Copy the `@import` URL
4. Paste it in `src/index.css` (replace the existing @import)
5. Update the font names in `src/config.ts`

### Change Text Content

All text is in the `content` section of `src/config.ts`:

```typescript
export const content = {
  logoText: "Newsletter",
  badgeText: "Join 10,000+ subscribers",
  headlineStart: "Stay ahead with",
  headlineAccent: " insights that matter",
  buttonText: "Subscribe Now",
  // ... more text
};
```

### Change Referral Sources

Edit the `referralSources` array:

```typescript
export const referralSources = [
  "Select an option",
  "Google Search",
  "YouTube",
  "Twitter / X",
  // Add your own options here!
  "TikTok",
  "Instagram",
];
```

---

## 📤 Adding More Fields to Webhook

Want to collect more data (like name, company, phone)? Here's how:

### Step 1: Add State in App.tsx

Find the state declarations and add yours:

```typescript
const [email, setEmail] = useState('');
const [source, setSource] = useState('');
const [name, setName] = useState('');  // Add this
```

### Step 2: Add the Input Field in App.tsx

Add a new form group (copy the email one and modify):

```tsx
<div className="form-group">
  <label htmlFor="name" className="label">
    Your Name
  </label>
  <input
    type="text"
    id="name"
    className="input"
    placeholder="John Doe"
    value={name}
    onChange={(e) => setName(e.target.value)}
    disabled={isSubmitting}
  />
</div>
```

### Step 3: Update the Payload in config.ts

Find `createWebhookPayload` and add your field:

```typescript
export const createWebhookPayload = (data: {
  email: string;
  source: string;
  name?: string;  // Add type
}) => {
  return {
    email: data.email,
    source: data.source,
    name: data.name,  // Add to payload
    timestamp: new Date().toISOString(),
  };
};
```

### Step 4: Pass the Value in App.tsx

Update the `createWebhookPayload` call:

```typescript
const payload = createWebhookPayload({
  email,
  source,
  name,  // Add this
});
```

---

## 📦 Build for Production

```bash
npm run build
```

This creates a `dist` folder you can deploy to any static hosting.

---

## 🌐 Deploy to a Live Website (FREE!)

Want to put this on a real website link for free? Watch this tutorial:

[![Deploy for Free](https://img.shields.io/badge/🎬_Watch_Tutorial-Deploy_for_FREE-red?style=for-the-badge&logo=youtube)](https://youtu.be/2WnxKCFAXAM?si=8rigSe9rL4sdD2hT)

**Free hosting options covered:**
- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

---

## 🗂 Project Structure

```
src/
├── config.ts      # ⭐ ALL CUSTOMIZATION HERE
├── App.tsx        # Main component
├── App.css        # Component styles
├── index.css      # Global styles & fonts
└── main.tsx       # Entry point
```

---

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_ZAPIER_WEBHOOK_URL` | Your Zapier Catch Hook URL | Yes |

---

## 🤝 Contributing

Feel free to fork this repo and make it your own!

## 📄 License

MIT - Use it however you want!
