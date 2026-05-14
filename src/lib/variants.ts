import type { ComponentType } from 'react';
import { LandingTrust } from '../variants/LandingTrust';
import { LandingSunlit } from '../variants/LandingSunlit';
import { LandingBold } from '../variants/LandingBold';

export type VariantKey = 'trust' | 'sunlit' | 'bold';

export type VariantDef = {
  key: VariantKey;
  shortLabel: string;
  fullLabel: string;
  Component: ComponentType;
};

export const VARIANTS: VariantDef[] = [
  { key: 'trust', shortLabel: 'V1 · Neighborly', fullLabel: 'V1 · Neighborly', Component: LandingTrust },
  { key: 'sunlit', shortLabel: 'V2 · Sunshine', fullLabel: 'V2 · Sunshine Magazine', Component: LandingSunlit },
  { key: 'bold', shortLabel: 'V3 · Coastal', fullLabel: 'V3 · Coastal Calm', Component: LandingBold },
];

export const DEFAULT_VARIANT: VariantKey = 'trust';

export function isVariantKey(value: string | null): value is VariantKey {
  return value === 'trust' || value === 'sunlit' || value === 'bold';
}

export function parseVariantFromSearch(search: string): VariantKey {
  const v = new URLSearchParams(search).get('v');
  return isVariantKey(v) ? v : DEFAULT_VARIANT;
}
