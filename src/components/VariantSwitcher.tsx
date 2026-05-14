import type { VariantKey } from '../lib/variants';
import { VARIANTS } from '../lib/variants';

type VariantSwitcherProps = {
  current: VariantKey;
  onChange: (v: VariantKey) => void;
};

export function VariantSwitcher({ current, onChange }: VariantSwitcherProps) {
  return (
    <div className="variant-switcher" role="tablist" aria-label="Landing page variant">
      {VARIANTS.map((v) => (
        <button
          key={v.key}
          type="button"
          role="tab"
          aria-selected={current === v.key}
          className={current === v.key ? 'active' : ''}
          onClick={() => onChange(v.key)}
        >
          {v.shortLabel}
        </button>
      ))}
    </div>
  );
}
