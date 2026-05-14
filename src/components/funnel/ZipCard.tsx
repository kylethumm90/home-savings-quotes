import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Icon } from '../Icon';

type ZipCardProps = {
  onSubmit: (zip: string) => void;
  headline?: string;
  sub?: string;
};

const DEFAULT_HEADLINE = 'See if your home qualifies — takes about 30 seconds';
const DEFAULT_SUB =
  "Pop in your zip and we'll line up free quotes from up to 3 friendly local installers.";

export function ZipCard({ onSubmit, headline = DEFAULT_HEADLINE, sub = DEFAULT_SUB }: ZipCardProps) {
  const [zip, setZip] = useState('');
  const [err, setErr] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^\d{5}$/.test(zip)) {
      setErr('Please enter a valid 5-digit zip.');
      inputRef.current?.focus();
      return;
    }
    setErr('');
    onSubmit(zip);
  };

  useEffect(() => {
    const handler = () => inputRef.current?.focus();
    window.addEventListener('hsq-focus-zip', handler);
    return () => window.removeEventListener('hsq-focus-zip', handler);
  }, []);

  return (
    <div className="zip-card" id="funnel">
      <div className="zip-card-tag">
        <span className="dot"></span> Free · No obligation · 50 states
      </div>
      <h3 className="zip-card-title">{headline}</h3>
      <p className="zip-card-sub">{sub}</p>
      <form className="zip-card-form" onSubmit={submit}>
        <div className="zip-card-input-wrap">
          <span className="zip-card-input-icon">
            <Icon name="pin" size={18} />
          </span>
          <input
            ref={inputRef}
            id="hsq-zip"
            className="zip-card-input"
            inputMode="numeric"
            maxLength={5}
            placeholder="Enter zip code"
            value={zip}
            onChange={(e) => {
              setZip(e.target.value.replace(/\D/g, '').slice(0, 5));
              setErr('');
            }}
            aria-label="Zip code"
          />
        </div>
        <button className="btn btn-primary btn-lg zip-card-btn" type="submit">
          Get my quote <Icon name="arrow-right" size={18} />
        </button>
      </form>
      {err && <div className="zip-card-err">{err}</div>}
      <div className="zip-card-trust">
        <span className="dot dot-green"></span>
        <span>Secure · No spam · Takes ~60 seconds total</span>
      </div>
    </div>
  );
}
