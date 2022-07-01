import { AprFetcher } from '../tokens';

let aprTtl = 0;
let apr: number;

/**
 * Gets Lido APR
 *
 * @returns lido apr in bps
 */
const getApr = async (): Promise<number> => {
  try {
    const response = await fetch(
      'https://app.overnight.fi/api/balancer/week/apr'
    );
    const apr = await response.text();

    return Math.round((parseFloat(apr) * 10000) / 100);
  } catch (error) {
    console.error('Failed to fetch USD+ APR:', error);
    return 0;
  }
};

/**
 * Business logic around APR fetching
 *
 * @returns cached APR for USD+
 */
export const overnight: AprFetcher = async () => {
  // cache for 1h
  if (Date.now() > aprTtl) {
    apr = await getApr();
    aprTtl = Date.now() + 1 * 60 * 60 * 1000;
  }

  return apr;
};
