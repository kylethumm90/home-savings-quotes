import { LandingTrust } from '../../variants/LandingTrust';
import { LandingSunlit } from '../../variants/LandingSunlit';
import { LandingBold } from '../../variants/LandingBold';
import { TweaksProvider, useTweaks } from '../../lib/TweaksContext';
import { TweaksPanel } from './TweaksPanel';
import { navigate } from '../../lib/useRoute';

const VARIANTS = [
  { id: 'v1', label: 'V1 · Neighborly', Component: LandingTrust },
  { id: 'v2', label: 'V2 · Sunshine Magazine', Component: LandingSunlit },
  { id: 'v3', label: 'V3 · Coastal Calm', Component: LandingBold },
];

function AdminInner() {
  const { heroStyle } = useTweaks();

  return (
    <div className="admin-page">
      <header className="admin-bar">
        <div className="admin-bar-title">
          <span className="admin-bar-eyebrow">HomeSavingsQuotes</span>
          <span className="admin-bar-name">Variant + tweaks preview</span>
        </div>
        <nav className="admin-bar-nav">
          {VARIANTS.map((v) => (
            <a key={v.id} href={`#${v.id}`} className="admin-bar-link">
              {v.label}
            </a>
          ))}
          <button
            className="admin-bar-exit"
            type="button"
            onClick={() => navigate('/')}
            title="Exit admin"
          >
            Exit ↗
          </button>
        </nav>
      </header>

      <main className="admin-canvas">
        {VARIANTS.map(({ id, label, Component }) => (
          <section className="admin-artboard" key={id} id={id}>
            <div className="admin-artboard-label">{label}</div>
            <div className="admin-artboard-frame">
              <Component heroStyle={heroStyle} />
            </div>
          </section>
        ))}
      </main>

      <TweaksPanel />
    </div>
  );
}

export function AdminPage() {
  return (
    <TweaksProvider>
      <AdminInner />
    </TweaksProvider>
  );
}
