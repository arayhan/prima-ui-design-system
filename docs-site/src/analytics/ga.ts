declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

export function initGoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };
  window.gtag('js', new Date());
  // send_page_view is off here because this is a HashRouter SPA — the initial
  // load and every route change both go through trackPageview() instead.
  window.gtag('config', GA_MEASUREMENT_ID, { send_page_view: false });
}

export function trackPageview(path: string) {
  if (!GA_MEASUREMENT_ID || typeof window.gtag !== 'function') return;
  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: document.title,
  });
}
