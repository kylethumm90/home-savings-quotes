import logoUrl from '../assets/Homesavingsquotes-logo.png';

type LogoProps = { inverted?: boolean };

export function Logo({ inverted = false }: LogoProps) {
  if (inverted) {
    // Dark-background fallback: keep the CSS-built wordmark since the brand
    // PNG is dark-on-transparent and would disappear on .ink surfaces.
    return (
      <a href="#" className="logo" style={{ color: '#fff' }}>
        <span className="logo-mark">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </span>
        <span className="logo-wordmark">
          Home<span className="alt">Savings</span>Quotes
        </span>
      </a>
    );
  }

  return (
    <a href="#" className="logo logo-img-wrap" aria-label="HomeSavingsQuotes">
      <img className="logo-img" src={logoUrl} alt="HomeSavingsQuotes" />
    </a>
  );
}
