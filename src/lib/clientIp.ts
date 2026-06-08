// Resolves the visitor's public IP address client-side. A browser can't read
// its own public IP directly, so we ask a lightweight echo service (ipify).
// The result is cached as a single in-flight promise so we fetch it at most
// once per page load; prefetch early in the funnel so it's ready by submit.

let cached: Promise<string | undefined> | null = null;

async function fetchIp(): Promise<string | undefined> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);
    const res = await fetch('https://api.ipify.org?format=json', {
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!res.ok) return undefined;
    const body = (await res.json()) as { ip?: string };
    return body.ip || undefined;
  } catch {
    // Blocked, offline, or timed out — submission proceeds without an IP.
    return undefined;
  }
}

// Kick off the lookup without waiting for it (call when the funnel starts).
export function prefetchClientIp(): void {
  if (!cached) cached = fetchIp();
}

// Returns the cached IP, starting the lookup if it hasn't run yet.
export function getClientIp(): Promise<string | undefined> {
  if (!cached) cached = fetchIp();
  return cached;
}
