/**
 * Analytics abstraction.
 *
 * Components call `track()` with a typed event. No component knows which
 * provider is configured, so the provider can change without touching a single
 * call site — and with `none` configured (the default) nothing is loaded at
 * all and no consent banner is required.
 *
 * Providers are wired in Phase 8. See docs/DEPLOYMENT_PLAN.md §4.
 */

/** The events named in the project brief §20. */
export type AnalyticsEvent =
  | { name: 'project_enquiry_started'; source: string }
  | { name: 'project_enquiry_completed'; reference: string }
  | { name: 'support_request_completed'; reference: string }
  | { name: 'phone_click'; location: string }
  | { name: 'whatsapp_click'; location: string }
  | { name: 'email_click'; location: string }
  | { name: 'solution_selected'; slug: string }
  | { name: 'configurator_completed'; steps: number }
  | { name: 'project_case_study_viewed'; slug: string }
  | { name: 'brochure_downloaded'; slug: string }
  | { name: 'partner_page_viewed'; slug: string }
  | { name: 'cta_clicked'; label: string; location: string };

type AnalyticsProvider = 'none' | 'ga4' | 'plausible' | 'umami';

function getProvider(): AnalyticsProvider {
  const configured = process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER;
  if (
    configured === 'ga4' ||
    configured === 'plausible' ||
    configured === 'umami'
  ) {
    return configured;
  }
  return 'none';
}

/**
 * Records an event. Safe to call from anywhere, including during server
 * rendering, where it is a no-op.
 */
export function track(event: AnalyticsEvent): void {
  if (typeof window === 'undefined') return;

  const provider = getProvider();
  if (provider === 'none') {
    if (process.env.NODE_ENV === 'development') {
      console.debug('[analytics]', event.name, event);
    }
    return;
  }

  // Phase 8: dispatch to the configured provider.
}
