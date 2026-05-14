import { useState } from 'react';
import { Icon } from './Icon';

type SavingsCalculatorProps = { onGetQuote: () => void };

export function SavingsCalculator({ onGetQuote }: SavingsCalculatorProps) {
  const [bill, setBill] = useState(180);
  // Rough industry heuristic: ~70-90% bill offset, 25-year horizon. 80% headline.
  const monthlySavings = Math.round(bill * 0.82);
  const yearOne = monthlySavings * 12;
  const lifetime = Math.round(yearOne * 25 * 1.18); // utility rate inflation
  const co2 = Math.round((bill / 150) * 4.2 * 25); // tons over 25y

  return (
    <section id="savings" style={{ background: 'var(--bg)' }}>
      <div className="container">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: 32,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <span className="sec-eyebrow">Savings calculator</span>
            <h2 className="sec-title">
              See what you could
              <br />
              be keeping.
            </h2>
          </div>
          <p className="sec-sub">
            Drag the slider to roughly match your typical monthly electric bill. We use a 25-year horizon and
            assume 3.5% utility rate inflation — your real numbers depend on roof, sun, and local incentives.
          </p>
        </div>

        <div className="calc">
          <div>
            <div className="calc-label">Your monthly electric bill</div>
            <div className="calc-bill">
              <span className="amount">${bill}</span>
              <span className="unit">/mo</span>
            </div>
            <input
              className="calc-slider"
              type="range"
              min={60}
              max={500}
              step={5}
              value={bill}
              onChange={(e) => setBill(+e.target.value)}
            />
            <div className="calc-ticks">
              <span>$60</span>
              <span>$180</span>
              <span>$300</span>
              <span>$500</span>
            </div>

            <div style={{ marginTop: 32, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {['$0 down financing', 'State & local rebates', 'Net metering credits'].map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 999,
                    background: 'var(--tint)',
                    color: 'var(--brand)',
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="calc-result">
            <div className="savings-row">
              <div className="item">
                <span className="lbl">First-year savings</span>
                <span className="val">${yearOne.toLocaleString()}</span>
                <span className="sub">≈ ${monthlySavings}/mo back in your pocket</span>
              </div>
              <div className="item">
                <span className="lbl">25-year lifetime savings</span>
                <span className="val">${lifetime.toLocaleString()}</span>
                <span className="sub">Includes ~3.5% annual utility rate inflation</span>
              </div>
              <div className="item">
                <span className="lbl">Carbon avoided</span>
                <span className="val">
                  {co2} <span style={{ fontSize: 20, opacity: 0.7 }}>tons CO₂</span>
                </span>
                <span className="sub">Like planting ~{Math.round(co2 * 16)} trees</span>
              </div>
            </div>
            <div className="cta-line">
              <span>Numbers are illustrative · Your quote is custom-priced.</span>
              <button
                className="btn btn-ghost"
                style={{
                  background: 'rgba(255,255,255,0.14)',
                  color: 'inherit',
                  border: '1px solid rgba(255,255,255,0.25)',
                }}
                onClick={onGetQuote}
              >
                Get my real quote <Icon name="arrow-right" size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
