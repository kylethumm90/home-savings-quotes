import { useState } from 'react';
import { Icon } from './Icon';

const FAQ_DATA = [
  {
    q: 'Is HomeSavingsQuotes really free?',
    a: "Yep, completely free for you. Our installer partners pay us a small fee when you decide to move forward with one of them — you'll never see a bill from us, and there's zero obligation to accept any quote you receive.",
  },
  {
    q: 'How much does solar typically cost in 2026?',
    a: 'A typical 6–8 kW home system runs $14,000–$22,000 before any local incentives. Most homeowners we work with go with $0-down financing and end up replacing their old electric bill with a smaller monthly payment on the system.',
  },
  {
    q: 'What incentives are available right now?',
    a: 'It depends on where you live. Many states still offer rebates, performance payments, or net-metering credits that pay you for the extra power your system sends back to the grid. Your installers will lay out exactly what you qualify for in your quote.',
  },
  {
    q: 'Will my roof qualify?',
    a: "Most south-, east-, and west-facing roofs in decent shape qualify. The installers do a quick remote roof check before sending quotes — if your roof isn't a great fit, you'll know up front rather than after a sales visit.",
  },
  {
    q: 'How long does the whole process take?',
    a: "You'll usually have your quotes within 24 hours. From signing with an installer to a working system on your roof is typically 6–10 weeks — most of that is permitting and waiting for the utility to flip the switch.",
  },
  {
    q: 'Does solar work in cloudy or cold places?',
    a: 'Yes! Solar panels run on daylight, not heat — Germany has more solar per capita than Texas. We factor in your local sun hours so the system is sized right for where you actually live.',
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number>(0);
  return (
    <section id="faq" style={{ background: 'var(--bg)' }}>
      <div className="container">
        <span className="sec-eyebrow">Good questions</span>
        <h2 className="sec-title">
          Answered like a
          <br />
          neighbor would.
        </h2>
        <div className="faq">
          {FAQ_DATA.map((f, i) => (
            <div
              className={'faq-item' + (open === i ? ' open' : '')}
              key={i}
              onClick={() => setOpen(open === i ? -1 : i)}
            >
              <div className="faq-q">
                <span>{f.q}</span>
                <span className="chev">
                  <Icon name="plus" size={14} />
                </span>
              </div>
              <div className="faq-a">{f.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
