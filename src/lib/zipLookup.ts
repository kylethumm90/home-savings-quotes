// Derives city / state from a US ZIP code via Zippopotam.us (free, no API key).
// The funnel already collects the ZIP up front, so we prefetch the lookup when
// the quiz opens and read the cached result at submit — no extra form fields.

export type ZipLocation = { city?: string; state?: string };

const cache = new Map<string, Promise<ZipLocation>>();

// Keeps only the 5-digit base of a ZIP (drops ZIP+4 / stray characters).
function normalize(zip: string): string {
  const match = (zip || '').trim().match(/^\d{5}/);
  return match ? match[0] : '';
}

async function fetchLocation(zip: string): Promise<ZipLocation> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);
    const res = await fetch(`https://api.zippopotam.us/us/${zip}`, {
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!res.ok) return {};
    const body = (await res.json()) as {
      places?: Array<{ 'place name'?: string; 'state abbreviation'?: string }>;
    };
    const place = body.places?.[0];
    return {
      city: place?.['place name'] || undefined,
      // 2-letter abbreviation (e.g. "CA"); switch to 'state' for the full name.
      state: place?.['state abbreviation'] || undefined,
    };
  } catch {
    // Unknown ZIP, blocked, or timed out — submission proceeds without it.
    return {};
  }
}

// Starts the lookup without waiting (call when the ZIP is known).
export function prefetchZipLocation(zip: string): void {
  const z = normalize(zip);
  if (z && !cache.has(z)) cache.set(z, fetchLocation(z));
}

// Returns the cached city/state, starting the lookup if it hasn't run yet.
export function getZipLocation(zip: string): Promise<ZipLocation> {
  const z = normalize(zip);
  if (!z) return Promise.resolve({});
  if (!cache.has(z)) cache.set(z, fetchLocation(z));
  return cache.get(z)!;
}
