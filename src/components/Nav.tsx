import { Icon } from './Icon';
import { Logo } from './Logo';

type NavProps = { inverted?: boolean };

export function Nav({ inverted = false }: NavProps) {
  return (
    <nav className="nav">
      <Logo inverted={inverted} />
      <div className="nav-links">
        <a href="#how">How it works</a>
        <a href="#savings">Savings</a>
        <a href="#faq">FAQ</a>
        <a className="nav-cta" href="#funnel">
          Get my quote <Icon name="arrow-right" size={14} />
        </a>
      </div>
    </nav>
  );
}
