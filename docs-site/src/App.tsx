import React from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Footer, ToastProvider } from 'prima-ui';
import { Nav } from './components/Nav';
import { Container } from './components/Section';
import { HomePage } from './pages/HomePage';
import { FoundationsPage } from './pages/FoundationsPage';
import { CorePage } from './pages/CorePage';
import { FormsPage } from './pages/FormsPage';
import { OverlaysPage } from './pages/OverlaysPage';
import { DisplayPage } from './pages/DisplayPage';
import { BlocksPage } from './pages/BlocksPage';
import { InteractionsPage } from './pages/InteractionsPage';
import { UsagePage } from './pages/UsagePage';
import { ContactPage } from './pages/ContactPage';
import { ScrollTrigger } from './motion/gsap';
import { trackPageview } from './analytics/ga';

/** Scroll to top + recalibrate ScrollTrigger whenever the route changes. */
function RouteReset() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
    trackPageview(pathname);
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 80);
    return () => window.clearTimeout(t);
  }, [pathname]);
  return null;
}

export function App() {
  return (
    <HashRouter>
      <ToastProvider>
        <RouteReset />
        <a
          href="#main"
          style={{
            position: 'absolute', left: -9999, top: 0, zIndex: 100,
            background: 'var(--primary)', color: 'var(--on-primary)', padding: '12px 20px',
            fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', textTransform: 'uppercase',
          } as React.CSSProperties}
          onFocus={(e) => { e.currentTarget.style.left = '0'; }}
          onBlur={(e) => { e.currentTarget.style.left = '-9999px'; }}
        >Skip to content</a>

        <Nav />

        <main id="main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/foundations" element={<FoundationsPage />} />
            <Route path="/components" element={<Navigate to="/components/core" replace />} />
            <Route path="/components/core" element={<CorePage />} />
            <Route path="/components/forms" element={<FormsPage />} />
            <Route path="/components/overlays" element={<OverlaysPage />} />
            <Route path="/components/display" element={<DisplayPage />} />
            <Route path="/blocks" element={<BlocksPage />} />
            <Route path="/blocks/interactions" element={<InteractionsPage />} />
            <Route path="/usage" element={<UsagePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>

        <Container>
          <Footer
            tagline="Prima — the personal design system of A. Rayhan Primadedas. Engineered minimalism, cobalt on ice."
            columns={[
              {
                title: 'INDEX',
                links: [
                  { label: 'Foundations', href: '#/foundations' },
                  { label: 'Components', href: '#/components' },
                  { label: 'Blocks', href: '#/blocks' },
                  { label: 'Usage', href: '#/usage' },
                  { label: 'Contact', href: '#/contact' },
                ],
              },
              {
                title: 'ELSEWHERE',
                links: [
                  { label: 'arayhan.com', href: 'https://arayhan.com' },
                  { label: 'GitHub', href: 'https://github.com/arayhan' },
                  { label: 'rayhanprima99@gmail.com', href: 'mailto:rayhanprima99@gmail.com' },
                ],
              },
            ]}
            note="© 2026 A. RAYHAN PRIMADEDAS — BUILT WITH PRIMA"
          />
        </Container>
      </ToastProvider>
    </HashRouter>
  );
}
