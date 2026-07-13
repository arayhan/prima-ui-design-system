// Blog list + detail (dummy data)
const BDS = window.ArayhanDesignSystem_bd91f4;
const BD = window.SITE_DATA;

const PAGE_SIZE = 3;

function SidebarBlock({ title, children }) {
  return (
    <div style={{ borderTop: '1px solid var(--border-default)', paddingTop: 16 }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{title}</div>
      <div style={{ marginTop: 12 }}>{children}</div>
    </div>
  );
}

function Pagination({ page, pages, setPage, total }) {
  if (pages <= 1) return null;
  const btn = (label, target, disabled, active) => (
    <button key={label + target} disabled={disabled} onClick={() => { setPage(target); window.scrollTo({ top: 0 }); }}
      style={{
        minWidth: 36, height: 36, padding: '0 10px', borderRadius: 'var(--radius-sm)', cursor: disabled ? 'default' : 'pointer',
        fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)',
        border: '1px solid ' + (active ? 'transparent' : 'var(--border-default)'),
        background: active ? 'var(--interactive-primary)' : 'transparent',
        color: active ? 'var(--text-on-primary)' : disabled ? 'var(--text-muted)' : 'var(--text-body)',
        opacity: disabled && !active ? 0.5 : 1,
        transition: 'all var(--duration-fast) var(--ease-out)',
      }}>{label}</button>
  );
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 36 }}>
      {btn('←', page - 1, page === 0, false)}
      {Array.from({ length: pages }, (_, i) => btn(String(i + 1), i, false, i === page))}
      {btn('→', page + 1, page === pages - 1, false)}
      <span style={{ marginLeft: 8, fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
        {total} posts
      </span>
    </div>
  );
}

function BlogListScreen({ openPost }) {
  const [page, setPage] = React.useState(0);
  const [query, setQuery] = React.useState('');
  const [topic, setTopic] = React.useState(null);
  const [sort, setSort] = React.useState('newest');

  const topics = React.useMemo(() => {
    const counts = {};
    BD.blog.forEach((p) => p.tags.forEach((t) => { counts[t] = (counts[t] || 0) + 1; }));
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, []);

  const filtered = React.useMemo(() => {
    let list = BD.blog.filter((p) => {
      const q = query.trim().toLowerCase();
      const matchQ = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q);
      const matchT = !topic || p.tags.includes(topic);
      return matchQ && matchT;
    });
    list = [...list].sort((a, b) => {
      const da = new Date(a.date), db = new Date(b.date);
      return sort === 'newest' ? db - da : da - db;
    });
    return list;
  }, [query, topic, sort]);

  const pages = Math.ceil(filtered.length / PAGE_SIZE);
  const visible = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const resetPage = () => setPage(0);

  return (
    <main data-screen-label="blog-list">
      <PageHero path="~/blog" title="Writing" ghost="BLOG" description="Notes on frontend architecture, realtime systems, and teaching developers.">
        <div style={{ position: 'relative', maxWidth: 440, marginTop: 8 }}>
          <i className="ph ph-magnifying-glass" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 16, color: 'var(--text-muted)' }}></i>
          <input value={query} onChange={(e) => { setQuery(e.target.value); resetPage(); }} placeholder="Search posts…"
            style={{
              width: '100%', boxSizing: 'border-box', padding: '12px 16px 12px 40px',
              fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--text-heading)',
              background: 'var(--surface-card)', border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-full)', outline: 'none',
            }} />
        </div>
      </PageHero>
      <div className="grid-blog" style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '48px var(--container-pad) 64px', display: 'grid', gridTemplateColumns: '1fr 240px', gap: 56, alignItems: 'start' }}>
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {visible.map((p) => (
              <BDS.Card key={p.id} interactive onClick={() => openPost(p.id)}>
                <div className="grid-blogcard" style={{ display: 'grid', gridTemplateColumns: '190px 1fr', gap: 20, alignItems: 'center' }}>
                  <div style={{ position: 'relative', aspectRatio: '4/3', borderRadius: 12, overflow: 'hidden' }}>
                    <image-slot id={'cover-' + p.id} shape="rounded" radius="12" src={p.cover} placeholder="Drop a cover"></image-slot>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                      {p.date} · {p.read} read · {p.views} views
                    </div>
                    <h3 style={{ fontSize: 'var(--text-xl)', margin: '10px 0 0' }}>{p.title}</h3>
                    <p style={{ margin: '8px 0 0', fontSize: 'var(--text-sm)' }}>{p.excerpt}</p>
                    <div style={{ display: 'flex', gap: 6, marginTop: 14, alignItems: 'center' }}>
                      {p.tags.map((t) => <BDS.Tag key={t}>{t}</BDS.Tag>)}
                      <span style={{ marginLeft: 'auto', fontSize: 'var(--text-sm)', color: 'var(--text-heading)', fontWeight: 500 }}>Read →</span>
                    </div>
                  </div>
                </div>
              </BDS.Card>
            ))}
            {visible.length === 0 && (
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>No posts match “{query || topic}”.</p>
            )}
          </div>
          <Pagination page={page} pages={pages} setPage={setPage} total={filtered.length} />
        </div>
        <aside style={{ position: 'sticky', top: 96, display: 'flex', flexDirection: 'column', gap: 24 }}>
          <SidebarBlock title="Topics">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {[[null, BD.blog.length, 'All'], ...topics.map(([t, c]) => [t, c, t])].map(([t, c, label]) => {
                const on = topic === t;
                return (
                  <button key={label} onClick={() => { setTopic(t); resetPage(); }}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'pointer',
                      padding: '5px 12px', borderRadius: 'var(--radius-full)',
                      fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', fontWeight: 500,
                      border: '1px solid ' + (on ? 'transparent' : 'var(--border-default)'),
                      background: on ? 'var(--interactive-primary)' : 'transparent',
                      color: on ? 'var(--text-on-primary)' : 'var(--text-body)',
                      transition: 'all var(--duration-fast) var(--ease-out)',
                    }}>
                    {label}<span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, opacity: 0.6 }}>{c}</span>
                  </button>
                );
              })}
            </div>
          </SidebarBlock>
          <SidebarBlock title="Sort by date">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[['newest', 'Newest first'], ['oldest', 'Oldest first']].map(([v, label]) => (
                <button key={v} onClick={() => { setSort(v); resetPage(); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', padding: 0,
                    border: 'none', background: 'transparent', textAlign: 'left',
                    fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)',
                    color: sort === v ? 'var(--text-heading)' : 'var(--text-muted)', fontWeight: sort === v ? 600 : 400,
                  }}>
                  <span style={{
                    width: 8, height: 8, borderRadius: 99, flex: 'none',
                    background: sort === v ? 'var(--interactive-primary)' : 'transparent',
                    border: '2px solid ' + (sort === v ? 'var(--interactive-primary)' : 'var(--border-strong)'),
                  }}></span>
                  {label}
                </button>
              ))}
            </div>
          </SidebarBlock>
        </aside>
      </div>
    </main>
  );
}

// ---------- rich post blocks ----------
function MathBlock({ tex }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    let tries = 0;
    const t = setInterval(() => {
      if (window.katex && ref.current) {
        window.katex.render(tex, ref.current, { displayMode: true, throwOnError: false });
        clearInterval(t);
      } else if (++tries > 40) clearInterval(t);
    }, 150);
    return () => clearInterval(t);
  }, [tex]);
  return <div ref={ref} style={{ padding: '18px 0', overflowX: 'auto', color: 'var(--text-heading)' }}>{tex}</div>;
}

function CodeBlock({ code, lang }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    let tries = 0;
    const t = setInterval(() => {
      if (window.hljs && ref.current) {
        ref.current.removeAttribute('data-highlighted');
        window.hljs.highlightElement(ref.current);
        clearInterval(t);
      } else if (++tries > 40) clearInterval(t);
    }, 150);
    return () => clearInterval(t);
  }, [code]);
  return (
    <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-default)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', background: '#0B1120', borderBottom: '1px solid rgba(148,163,184,.15)' }}>
        <span style={{ width: 9, height: 9, borderRadius: 99, background: '#334155' }}></span>
        <span style={{ width: 9, height: 9, borderRadius: 99, background: '#334155' }}></span>
        <span style={{ width: 9, height: 9, borderRadius: 99, background: '#334155' }}></span>
        <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 10, color: '#64748B' }}>{lang}</span>
      </div>
      <pre style={{ margin: 0, background: '#0B1120' }}>
        <code ref={ref} className={'language-' + lang} style={{ display: 'block', padding: '16px 18px', fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 1.65, background: 'transparent' }}>{code}</code>
      </pre>
    </div>
  );
}

function RichParagraph({ parts, openPost }) {
  return (
    <p style={{ margin: 0 }}>
      {parts.map((seg, i) => {
        if (seg.mark) return <mark key={i} style={{ background: 'var(--accent-soft)', color: 'var(--text-heading)', padding: '1px 5px', borderRadius: 4 }}>{seg.text}</mark>;
        if (seg.href || seg.post) return (
          <a key={i} href={seg.href || '#'} target={seg.post ? undefined : '_blank'} rel="noreferrer"
            onClick={seg.post ? (e) => { e.preventDefault(); openPost && openPost(seg.post); } : undefined}
            style={{ textDecoration: 'underline', textUnderlineOffset: 3 }}>{seg.text}</a>
        );
        return <span key={i}>{seg.text}</span>;
      })}
    </p>
  );
}

function PostBody({ post, openPost }) {
  const oldFormat = Array.isArray(post.body[0]);
  let h = -1;
  const blocks = oldFormat
    ? post.body.flatMap(([head, text]) => [{ t: 'h2', text: head }, { t: 'p', parts: [{ text }] }])
    : post.body;
  return (
    <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column', gap: 24 }}>
      {blocks.map((b, i) => {
        if (b.t === 'h2') { h += 1; return <h2 key={i} id={'h-' + h} style={{ fontSize: 'var(--text-2xl)', marginTop: h > 0 ? 12 : 0 }}>{b.text}</h2>; }
        if (b.t === 'p') return <RichParagraph key={i} parts={b.parts} openPost={openPost} />;
        if (b.t === 'code') return <CodeBlock key={i} code={b.code} lang={b.lang} />;
        if (b.t === 'math') return <MathBlock key={i} tex={b.tex} />;
        if (b.t === 'img') return (
          <figure key={i} style={{ margin: '6px 0' }}>
            <div style={{ width: '100%', aspectRatio: '16/9', position: 'relative' }}>
              <image-slot id={b.slot} shape="rounded" radius="10" placeholder="Drop a diagram or screenshot"></image-slot>
            </div>
            <figcaption style={{ marginTop: 10, fontFamily: 'var(--font-hand)', fontSize: 18, color: 'var(--text-muted)', textAlign: 'center', transform: 'rotate(-0.5deg)' }}>{b.caption}</figcaption>
          </figure>
        );
        return null;
      })}
    </div>
  );
}

// ---------- comments ----------
function Avatar({ name, isAuthor }) {
  const initials = name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();
  return (
    <span style={{
      width: 36, height: 36, borderRadius: 99, flex: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      background: isAuthor ? 'var(--interactive-primary)' : 'var(--bg-muted)',
      color: isAuthor ? 'var(--text-on-primary)' : 'var(--text-body)',
      border: '1px solid ' + (isAuthor ? 'transparent' : 'var(--border-default)'),
      fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 600,
    }}>{initials}</span>
  );
}

function CommentBubble({ c }) {
  return (
    <div style={{ display: 'flex', gap: 14 }}>
      <Avatar name={c.author} isAuthor={c.isAuthor} />
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <span style={{ fontWeight: 600, color: 'var(--text-heading)', fontSize: 'var(--text-sm)' }}>{c.author}</span>
          {c.isAuthor && (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', padding: '2px 8px', borderRadius: 99, background: 'var(--accent-soft)', color: 'var(--text-accent)', border: '1px solid var(--accent-soft-border)' }}>Author</span>
          )}
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)' }}>{c.date}</span>
        </div>
        <p style={{ margin: '6px 0 0', fontSize: 'var(--text-sm)' }}>{c.text}</p>
      </div>
    </div>
  );
}

function Comments({ post }) {
  const [items, setItems] = React.useState(post.comments || []);
  const [draft, setDraft] = React.useState('');
  const count = items.reduce((n, c) => n + 1 + (c.replies || []).length, 0);
  const submit = (e) => {
    e.preventDefault();
    if (!draft.trim()) return;
    setItems([...items, { author: 'Guest', date: 'Just now', text: draft.trim(), replies: [] }]);
    setDraft('');
  };
  return (
    <div style={{ marginTop: 56, borderTop: '1px solid var(--border-default)', paddingTop: 32 }}>
      <h2 style={{ fontSize: 'var(--text-2xl)' }}>Comments <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-base)' }}>({count})</span></h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 26, marginTop: 26 }}>
        {items.map((c, i) => (
          <div key={i}>
            <CommentBubble c={c} />
            {(c.replies || []).length > 0 && (
              <div style={{ marginLeft: 18, marginTop: 16, paddingLeft: 30, borderLeft: '2px solid var(--border-default)', display: 'flex', flexDirection: 'column', gap: 16 }}>
                {c.replies.map((r, j) => <CommentBubble key={j} c={r} />)}
              </div>
            )}
          </div>
        ))}
        {items.length === 0 && <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>No comments yet — be the first.</p>}
      </div>
      <form onSubmit={submit} style={{ display: 'flex', gap: 12, marginTop: 30, alignItems: 'flex-start' }}>
        <Avatar name="Guest User" />
        <textarea value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Join the discussion…" rows={2}
          style={{
            flex: 1, boxSizing: 'border-box', padding: '12px 14px', resize: 'vertical',
            fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--text-heading)', lineHeight: 1.6,
            background: 'var(--surface-card)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', outline: 'none',
          }} />
        <BDS.Button variant="primary">Comment</BDS.Button>
      </form>
    </div>
  );
}

function BlogPostScreen({ postId, back, openPost }) {
  const p = BD.blog.find((x) => x.id === postId) || BD.blog[0];
  const [activeH, setActiveH] = React.useState(0);
  return (
    <main data-screen-label="blog-post" style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '110px var(--container-pad) 56px' }}>
      <button onClick={back} style={{
        border: 'none', background: 'transparent', cursor: 'pointer', padding: 0,
        fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--text-accent)', fontWeight: 500,
      }}>← All posts</button>
      <div className="grid-post" style={{ display: 'grid', gridTemplateColumns: '1fr 220px', gap: 56, marginTop: 28, alignItems: 'start' }}>
        <article style={{ maxWidth: 680 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
            {p.date} · {p.read} read · {p.views} views
          </div>
          <h1 style={{ fontSize: 'var(--text-4xl)', margin: '14px 0 0' }}>{p.title}</h1>
          <div style={{ display: 'flex', gap: 6, marginTop: 16 }}>
            {p.tags.map((t) => <BDS.Tag key={t}>{t}</BDS.Tag>)}
          </div>
          <PostBody post={p} openPost={openPost} />
          <Comments post={p} />
        </article>
        <aside className="toc-aside" style={{ position: 'sticky', top: 96 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>On this page</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 12, borderLeft: '1px solid var(--border-default)' }}>
            {p.toc.map((h, i) => (
              <a key={h} href={'#h-' + i} onClick={(e) => {
                e.preventDefault(); setActiveH(i);
                const el = document.getElementById('h-' + i);
                if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' });
              }}
                style={{
                  padding: '6px 14px', fontSize: 'var(--text-sm)', marginLeft: -1,
                  borderLeft: '2px solid ' + (activeH === i ? 'var(--accent)' : 'transparent'),
                  color: activeH === i ? 'var(--text-accent)' : 'var(--text-body)',
                  fontWeight: activeH === i ? 500 : 400,
                }}>{h}</a>
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
}

Object.assign(window, { BlogListScreen, BlogPostScreen });
