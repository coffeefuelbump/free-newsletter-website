import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from 'react';
import './App.css';
import { colors, content, createWebhookPayload, fonts, referralSources } from './config';

const theme = {
  '--bg-primary': colors.bgPrimary,
  '--bg-secondary': colors.bgSecondary,
  '--bg-tertiary': colors.bgTertiary,
  '--accent-primary': colors.accentPrimary,
  '--accent-secondary': colors.accentSecondary,
  '--text-primary': colors.textPrimary,
  '--text-secondary': colors.textSecondary,
  '--text-muted': colors.textMuted,
  '--border-color': colors.borderColor,
  '--success': colors.success,
  '--error': colors.error,
  '--font-heading': fonts.heading,
  '--font-body': fonts.body,
} as CSSProperties;

type FormError = { field?: 'email' | 'source'; message: string };

function App() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [source, setSource] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<FormError | null>(null);
  const successHeading = useRef<HTMLHeadingElement>(null);
  const [sourcePlaceholder, ...sourceOptions] = referralSources;

  useEffect(() => {
    if (isSubmitted) successHeading.current?.focus();
  }, [isSubmitted]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;
    setError(null);

    const address = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address)) {
      setError({
        field: 'email',
        message: address ? 'Enter a valid email address.' : 'Enter your email address.',
      });
      event.currentTarget.querySelector<HTMLInputElement>('#email')?.focus();
      return;
    }

    if (!source) {
      setError({ field: 'source', message: 'Choose how you found us.' });
      event.currentTarget.querySelector<HTMLSelectElement>('#source')?.focus();
      return;
    }

    const webhookUrl = import.meta.env.VITE_ZAPIER_WEBHOOK_URL;
    if (!webhookUrl) {
      setError({ message: import.meta.env.DEV
        ? 'Signups are unavailable in this preview.'
        : 'Signups are temporarily unavailable.' });
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = createWebhookPayload({ email: address, phone: phone.trim(), source });
      const body = new URLSearchParams();
      for (const [key, value] of Object.entries(payload)) {
        body.append(key, String(value));
      }
      const response = await fetch(webhookUrl, { method: 'POST', body });
      if (!response.ok) throw new Error('Subscription request failed');
      setIsSubmitted(true);
    } catch {
      setError({ message: 'We couldn’t complete your signup. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="app" id="top" style={theme}>
      <header className="site-header page-width">
        <a className="brand" href="#top">
          <span className="brand-mark" aria-hidden="true">{content.logoIcon}</span>
          {content.logoText}
        </a>
        {!isSubmitted && (
          <a className="header-link" href="#email">Subscribe <span aria-hidden="true">↗</span></a>
        )}
      </header>

      <main className="page-width">
        <div className="landing">
          <section className="hero" aria-labelledby="headline">
            <img className="hero-art" src={import.meta.env.BASE_URL + 'newsletter-hero.webp'} alt="" width="1254" height="1254" fetchPriority="high" />
            <div className="hero-copy">
              <p className="reader-count"><span aria-hidden="true" />{content.badgeText}</p>
              <h1 id="headline">
                {content.headlineStart}{' '}
                <em>{content.headlineAccent}</em>
              </h1>
              <p className="hero-description">{content.subheadline}</p>
            </div>
          </section>

          <section className="signup" aria-labelledby="signup-title">
            {isSubmitted ? (
              <div className="confirmation">
                <span className="signup-mark confirmation-mark" aria-hidden="true">✓</span>
                <h2 id="signup-title" ref={successHeading} tabIndex={-1}>{content.successTitle}</h2>
                <p>{content.successMessage}</p>
              </div>
            ) : (
              <>
                <div className="signup-heading">
                  <span className="signup-mark" aria-hidden="true"><span className="envelope" /></span>
                  <h2 id="signup-title">{content.signupTitle}</h2>
                </div>

                <form className="signup-form" onSubmit={handleSubmit} noValidate aria-busy={isSubmitting}>
                  <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                        if (error?.field === 'email') setError(null);
                      }}
                      required
                      disabled={isSubmitting}
                      aria-invalid={error?.field === 'email' || undefined}
                      aria-describedby={error?.field === 'email' ? 'email-error' : undefined}
                    />
                    {error?.field === 'email' && <p id="email-error" className="field-error" role="alert">{error.message}</p>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone number <span className="optional">Optional</span></label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="(555) 123-4567"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="source">How did you find us?</label>
                    <div className="select-wrap">
                      <select
                        id="source"
                        name="source"
                        value={source}
                        onChange={(event) => {
                          setSource(event.target.value);
                          if (error?.field === 'source') setError(null);
                        }}
                        required
                        disabled={isSubmitting}
                        aria-invalid={error?.field === 'source' || undefined}
                        aria-describedby={error?.field === 'source' ? 'source-error' : undefined}
                      >
                        <option value="" disabled>{sourcePlaceholder}</option>
                        {sourceOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                      </select>
                    </div>
                    {error?.field === 'source' && <p id="source-error" className="field-error" role="alert">{error.message}</p>}
                  </div>

                  {error && !error.field && <p className="form-error" role="alert">{error.message}</p>}

                  <button className="submit-button" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? content.buttonLoadingText : content.buttonText}
                    <span className={isSubmitting ? 'spinner' : 'button-arrow'} aria-hidden="true">
                      {isSubmitting ? '' : '↗'}
                    </span>
                  </button>
                  <p className="privacy-note">{content.privacyNote}</p>
                </form>
              </>
            )}
          </section>
        </div>

        <ul className="features" aria-label="What’s in the newsletter">
          {content.features.map((feature) => (
            <li className="feature" key={feature.title}>
              <span className="feature-mark" aria-hidden="true">{feature.icon}</span>
              <div>
                <h2>{feature.title}</h2>
                <p>{feature.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </main>

      <footer className="site-footer page-width">
        <p>{content.footerText}</p>
      </footer>
    </div>
  );
}

export default App;
