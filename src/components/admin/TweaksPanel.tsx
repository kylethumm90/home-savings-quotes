import { useTweaks, type HeroStyle } from '../../lib/TweaksContext';

const HERO_STYLES: { value: HeroStyle; label: string }[] = [
  { value: 'photo', label: 'Photo' },
  { value: 'illustration', label: 'Illus.' },
  { value: 'bill', label: 'Bill' },
];

const HUE_SWATCHES = [50, 70, 30, 15, 90];

export function TweaksPanel() {
  const { heroStyle, accentHueV1, setTweak } = useTweaks();

  return (
    <aside className="admin-tweaks">
      <div className="admin-tweaks-head">
        <span className="admin-tweaks-title">Tweaks</span>
        <span className="admin-tweaks-sub">Affects all variants</span>
      </div>

      <section className="admin-tweaks-section">
        <div className="admin-tweaks-label">Hero imagery</div>
        <div className="admin-tweaks-radio">
          {HERO_STYLES.map((s) => (
            <button
              key={s.value}
              type="button"
              className={'admin-tweaks-pill' + (heroStyle === s.value ? ' active' : '')}
              onClick={() => setTweak('heroStyle', s.value)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </section>

      <section className="admin-tweaks-section">
        <div className="admin-tweaks-label">V1 · Sunwarm accent</div>
        <div className="admin-tweaks-swatches">
          {HUE_SWATCHES.map((h) => (
            <button
              key={h}
              type="button"
              title={`hue ${h}`}
              onClick={() => setTweak('accentHueV1', h)}
              className={'admin-tweaks-swatch' + (accentHueV1 === h ? ' active' : '')}
              style={{ background: `oklch(0.6 0.18 ${h})` }}
            />
          ))}
        </div>
        <label className="admin-tweaks-slider-row">
          <span>Fine-tune hue</span>
          <input
            type="range"
            min={0}
            max={130}
            step={1}
            value={accentHueV1}
            onChange={(e) => setTweak('accentHueV1', +e.target.value)}
          />
          <span className="admin-tweaks-value">{accentHueV1}</span>
        </label>
      </section>
    </aside>
  );
}
