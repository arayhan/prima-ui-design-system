// Contact — standalone page
const CDS = window.ArayhanDesignSystem_bd91f4;

function ContactScreen() {
  const [sent, setSent] = React.useState(false);
  return (
    <main data-screen-label="contact">
      <PageHero path="~/contact" title="Let's talk" ghost="TALK" description="Hiring for a frontend lead, or need a senior pair of hands on a project?" />
      <div className="grid-2" style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '48px var(--container-pad) 64px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'start' }}>
        <Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            <div style={{ fontFamily: 'var(--font-hand)', fontSize: 28, color: 'var(--text-heading)', transform: 'rotate(-2deg)', width: 'fit-content' }}>
              I reply within 48 hours — promise! <span style={{ color: 'var(--accent)' }}>✳</span>
            </div>
            <CDS.SocialLinks />
            <CDS.Button variant="secondary" href="../../assets/cv-rayhan.pdf" target="_blank" style={{ width: 'fit-content' }}
              icon={<i className="ph-duotone ph-file-pdf" style={{ fontSize: 18 }}></i>}>Download CV (PDF)</CDS.Button>
            <IsoInline variant="grid" size={210} />
          </div>
        </Reveal>
        <Reveal delay={120}>
          {sent ? (
            <CDS.Card>
              <h3 style={{ fontSize: 'var(--text-xl)' }}>Message sent</h3>
              <p style={{ margin: '8px 0 0', fontSize: 'var(--text-sm)' }}>Thanks — I'll get back to you within 48 hours.</p>
            </CDS.Card>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{
              display: 'flex', flexDirection: 'column', gap: 16,
              background: 'var(--surface-card)', border: '1px solid var(--border-default)',
              borderRadius: 20, padding: 24, boxShadow: 'var(--shadow-sm)',
            }}>
              <CDS.Input label="Name" placeholder="Your name" required />
              <CDS.Input label="Email" type="email" placeholder="you@company.com" required />
              <CDS.Input label="Message" textarea placeholder="What are you building?" required />
              <CDS.Button variant="primary" size="lg" style={{ width: 'fit-content' }}>Send message</CDS.Button>
            </form>
          )}
        </Reveal>
      </div>
    </main>
  );
}

Object.assign(window, { ContactScreen });
