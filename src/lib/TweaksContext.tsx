import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type HeroStyle = 'photo' | 'illustration' | 'bill';

export type Tweaks = {
  heroStyle: HeroStyle;
  accentHueV1: number;
};

export const DEFAULT_TWEAKS: Tweaks = {
  heroStyle: 'photo',
  accentHueV1: 50,
};

type TweaksContextValue = Tweaks & {
  setTweak: <K extends keyof Tweaks>(key: K, value: Tweaks[K]) => void;
};

const TweaksContext = createContext<TweaksContextValue>({
  ...DEFAULT_TWEAKS,
  setTweak: () => {},
});

type ProviderProps = {
  initial?: Partial<Tweaks>;
  children: ReactNode;
};

// Injects the V1 accent hue as a CSS custom-property override scoped to .lp.v1
// so the OKLCH retint applies live without re-rendering the whole variant.
function useV1HueInjection(hue: number): void {
  useEffect(() => {
    const id = '__hsq-tweak-vars';
    let el = document.getElementById(id) as HTMLStyleElement | null;
    if (!el) {
      el = document.createElement('style');
      el.id = id;
      document.head.appendChild(el);
    }
    el.textContent = `.lp.v1 { --brand: oklch(0.68 0.16 ${hue}); --brand-tint: oklch(0.93 0.06 ${hue}); --brand-shadow: oklch(0.68 0.16 ${hue} / 0.30); --placeholder-stripe: oklch(0.68 0.16 ${hue} / 0.14); }`;
  }, [hue]);
}

export function TweaksProvider({ initial, children }: ProviderProps) {
  const [tweaks, setTweaks] = useState<Tweaks>(() => ({ ...DEFAULT_TWEAKS, ...initial }));
  useV1HueInjection(tweaks.accentHueV1);

  const value = useMemo<TweaksContextValue>(
    () => ({
      ...tweaks,
      setTweak: (key, val) => setTweaks((prev) => ({ ...prev, [key]: val })),
    }),
    [tweaks],
  );

  return <TweaksContext.Provider value={value}>{children}</TweaksContext.Provider>;
}

export function useTweaks(): TweaksContextValue {
  return useContext(TweaksContext);
}
