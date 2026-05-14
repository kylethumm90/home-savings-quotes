import logoLightBg from '../assets/Homesavingsquotes-logo.png';
import logoDarkBg from '../assets/hsq-logo-darkbg.png';

type LogoProps = { inverted?: boolean };

export function Logo({ inverted = false }: LogoProps) {
  const src = inverted ? logoDarkBg : logoLightBg;
  return (
    <a href="#" className="logo logo-img-wrap" aria-label="HomeSavingsQuotes">
      <img className="logo-img" src={src} alt="HomeSavingsQuotes" />
    </a>
  );
}
