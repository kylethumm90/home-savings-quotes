import { useEffect, useState } from 'react';
import { VariantSwitcher } from './components/VariantSwitcher';
import { VARIANTS, parseVariantFromSearch, type VariantKey } from './lib/variants';

export function App() {
  const [variant, setVariant] = useState<VariantKey>(() => parseVariantFromSearch(window.location.search));

  useEffect(() => {
    const onPop = () => setVariant(parseVariantFromSearch(window.location.search));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const changeVariant = (next: VariantKey) => {
    const params = new URLSearchParams(window.location.search);
    params.set('v', next);
    const url = window.location.pathname + '?' + params.toString() + window.location.hash;
    window.history.pushState({}, '', url);
    setVariant(next);
  };

  const current = VARIANTS.find((v) => v.key === variant) ?? VARIANTS[0];
  const Variant = current.Component;

  return (
    <>
      <Variant />
      <VariantSwitcher current={variant} onChange={changeVariant} />
    </>
  );
}
