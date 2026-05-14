type IconProps = {
  name: string;
  size?: number;
  stroke?: string;
};

export function Icon({ name, size = 18, stroke = 'currentColor' }: IconProps) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke,
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  switch (name) {
    case 'arrow-right':
      return (
        <svg {...common}>
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      );
    case 'check':
      return (
        <svg {...common}>
          <path d="M5 12l5 5L20 7" />
        </svg>
      );
    case 'plus':
      return (
        <svg {...common}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      );
    case 'shield':
      return (
        <svg {...common}>
          <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />
        </svg>
      );
    case 'spark':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" />
        </svg>
      );
    case 'home':
      return (
        <svg {...common}>
          <path d="M3 10l9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V10z" />
        </svg>
      );
    case 'home-2story':
      return (
        <svg {...common}>
          <rect x="3" y="11" width="18" height="10" />
          <path d="M3 11l9-6 9 6" />
          <rect x="10" y="16" width="4" height="5" />
        </svg>
      );
    case 'townhouse':
      return (
        <svg {...common}>
          <rect x="4" y="7" width="6" height="14" />
          <rect x="14" y="11" width="6" height="10" />
          <path d="M4 7l3-3 3 3M14 11l3-3 3 3" />
        </svg>
      );
    case 'condo':
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" />
          <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
        </svg>
      );
    case 'bolt':
      return (
        <svg {...common}>
          <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
        </svg>
      );
    case 'pin':
      return (
        <svg {...common}>
          <path d="M12 22s-7-7-7-12a7 7 0 0 1 14 0c0 5-7 12-7 12z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
    case 'phone':
      return (
        <svg {...common}>
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.6a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.7.6 2.6.7A2 2 0 0 1 22 16.9z" />
        </svg>
      );
    case 'panel':
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="12" rx="1" />
          <path d="M3 10h18M3 16h18M9 4v12M15 4v12M12 16v5M9 21h6" />
        </svg>
      );
    case 'leaf':
      return (
        <svg {...common}>
          <path d="M11 20a8 8 0 0 0 8-8V4h-8a8 8 0 0 0 0 16zM3 21l8-8" />
        </svg>
      );
    case 'dollar':
      return (
        <svg {...common}>
          <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      );
    case 'star':
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" />
        </svg>
      );
    case 'chev':
      return (
        <svg {...common}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      );
    default:
      return null;
  }
}
