import { useEffect, useState } from 'react';

// Tiny pathname-only router. Subscribes to popstate and a custom
// `route-change` event so calls to `navigate()` from anywhere in the app
// re-render this hook's consumers.
export function useRoute(): string {
  const [path, setPath] = useState<string>(() => window.location.pathname);
  useEffect(() => {
    const onChange = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onChange);
    window.addEventListener('route-change', onChange);
    return () => {
      window.removeEventListener('popstate', onChange);
      window.removeEventListener('route-change', onChange);
    };
  }, []);
  return path;
}

export function navigate(to: string): void {
  if (to === window.location.pathname) return;
  window.history.pushState({}, '', to);
  window.dispatchEvent(new Event('route-change'));
}
