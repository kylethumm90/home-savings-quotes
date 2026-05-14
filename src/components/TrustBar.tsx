import { Icon } from './Icon';

export function TrustBar() {
  return (
    <div className="trust-bar">
      <div className="trust-item">
        <span className="n">10,000+</span>
        <span>homeowners helped</span>
      </div>
      <div className="trust-item">
        <Icon name="home" size={18} />
        <span>Network of trusted local installers</span>
      </div>
      <div className="trust-item">
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: 999,
            background: '#16a34a',
            display: 'inline-block',
            boxShadow: '0 0 0 4px rgba(34,197,94,.15)',
          }}
        ></span>
        <span>
          Available in <strong style={{ color: 'var(--ink)' }}>all 50 states</strong>
        </span>
      </div>
      <div className="trust-item">
        <Icon name="shield" size={18} />
        <span>No spam, ever</span>
      </div>
    </div>
  );
}
