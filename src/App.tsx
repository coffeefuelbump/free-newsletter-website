import { useState, useEffect, type FormEvent } from 'react';
import './App.css';
import {
  content,
  referralSources,
  colors,
  fonts,
  createWebhookPayload,
} from './config';

// Apply theme colors and fonts from config
function applyTheme() {
  const root = document.documentElement;
  
  // Apply colors
  root.style.setProperty('--bg-primary', colors.bgPrimary);
  root.style.setProperty('--bg-secondary', colors.bgSecondary);
  root.style.setProperty('--bg-tertiary', colors.bgTertiary);
  root.style.setProperty('--accent-primary', colors.accentPrimary);
  root.style.setProperty('--accent-secondary', colors.accentSecondary);
  root.style.setProperty('--accent-glow', colors.accentPrimary + '26'); // 15% opacity
  root.style.setProperty('--text-primary', colors.textPrimary);
  root.style.setProperty('--text-secondary', colors.textSecondary);
  root.style.setProperty('--text-muted', colors.textMuted);
  root.style.setProperty('--border-color', colors.borderColor);
  root.style.setProperty('--success', colors.success);
  root.style.setProperty('--error', colors.error);
  
  // Apply fonts
  root.style.setProperty('--font-heading', fonts.heading);
  root.style.setProperty('--font-body', fonts.body);
}

function App() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [source, setSource] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Apply theme on mount
  useEffect(() => {
    applyTheme();
  }, []);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!source || source === 'Select an option') {
      setError('Please tell us how you found us');
      return;
    }

    setIsSubmitting(true);

    try {
      const webhookUrl = import.meta.env.VITE_ZAPIER_WEBHOOK_URL;
      
      if (!webhookUrl) {
        throw new Error('Webhook URL not configured');
      }

      // Create payload using the config function - easy to customize!
      const payload = createWebhookPayload({
        email,
        phone,
        source,
      });

      // Use URLSearchParams to avoid CORS preflight (no Content-Type: application/json)
      const formData = new URLSearchParams();
      Object.entries(payload).forEach(([key, value]) => {
        formData.append(key, String(value));
      });

      const response = await fetch(webhookUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to subscribe');
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error('Submission error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="app">
        <div className="background-pattern" />
        <div className="glow-orb glow-orb-1" />
        <div className="glow-orb glow-orb-2" />
        
        <main className="container success-container">
          <div className="success-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className="success-title">{content.successTitle}</h2>
          <p className="success-message">{content.successMessage}</p>
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="background-pattern" />
      <div className="glow-orb glow-orb-1" />
      <div className="glow-orb glow-orb-2" />

      <main className="container">
        <header className="header">
          <div className="logo">
            <span className="logo-icon">{content.logoIcon}</span>
            <span className="logo-text">{content.logoText}</span>
          </div>
        </header>

        <section className="hero">
          <div className="badge">
            <span className="badge-dot" />
            {content.badgeText}
          </div>

          <h1 className="headline">
            {content.headlineStart}
            <span className="headline-accent">{content.headlineAccent}</span>
          </h1>

          <p className="subheadline">{content.subheadline}</p>
        </section>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone" className="label">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              className="input"
              placeholder="(555) 123-4567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="source" className="label">
              How did you find us?
            </label>
            <div className="select-wrapper">
              <select
                id="source"
                className="select"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                disabled={isSubmitting}
              >
                {referralSources.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <div className="select-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>

          {error && (
            <div className="error-message">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className="spinner" />
                {content.buttonLoadingText}
              </>
            ) : (
              <>
                {content.buttonText}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </>
            )}
          </button>

          <p className="privacy-note">{content.privacyNote}</p>
        </form>

        <section className="features">
          {content.features.map((feature, index) => (
            <div className="feature" key={index}>
              <div className="feature-icon">{feature.icon}</div>
              <div className="feature-text">
                <strong>{feature.title}</strong>
                <span>{feature.description}</span>
              </div>
            </div>
          ))}
        </section>
      </main>

      <footer className="footer">
        <p>{content.footerText}</p>
      </footer>
    </div>
  );
}

export default App;
