type LogoProps = { inverted?: boolean };

export function Logo({ inverted = false }: LogoProps) {
  return (
    <a href="#" className="logo" style={inverted ? { color: '#fff' } : undefined}>
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
