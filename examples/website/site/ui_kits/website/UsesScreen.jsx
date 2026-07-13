// /uses — gear, tools, AI workflow
const UDS = window.ArayhanDesignSystem_bd91f4;
const UD = window.SITE_DATA;

// Brand logo chip: simple-icons CDN with Phosphor fallback if the brand isn't in the set.
function BrandIcon({ icon, ph }) {
  const [failed, setFailed] = React.useState(false);
  return (
    <span style={{
      width: 34, height: 34, flex: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      background: '#FFFFFF', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-sm)',
    }}>
      {icon && !failed
        ? <img src={icon} alt="" width="18" height="18" onError={() => setFailed(true)} style={{ display: 'block' }} />
        : <i className={'ph-duotone ' + ph} style={{ fontSize: 18, color: 'var(--slate-600)' }}></i>}
    </span>
  );
}

function UsesScreen() {
  const groups = Object.entries(UD.uses);
  return (
    <main data-screen-label="uses">
      <PageHero path="~/uses" title="Tools I actually use" ghost="USES" description="Editor, AI workflow, stack defaults, and gear. Inspired by uses.tech." />
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '48px var(--container-pad) 64px' }}>
        <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {groups.map(([group, items]) => (
          <UDS.Card key={group}>
            <h3 style={{ fontSize: 'var(--text-lg)' }}>{group}</h3>
            <ul style={{ margin: '16px 0 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {items.map((item) => (
                <li key={item.label} style={{ display: 'flex', gap: 12, alignItems: 'center', fontSize: 'var(--text-sm)' }}>
                  <BrandIcon icon={item.icon} ph={item.ph} />
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </UDS.Card>
        ))}
        </div>
      </div>
    </main>
  );
}

Object.assign(window, { UsesScreen });
