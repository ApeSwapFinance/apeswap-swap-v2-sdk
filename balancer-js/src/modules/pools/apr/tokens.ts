import { lido } from './tokens/lido';
import { aave } from './tokens/aave';
import { overnight } from './tokens/overnight';

export { wrappedTokensMap as aaveWrappedMap } from './tokens/aave';

/**
 * Common interface for fetching APR from external sources
 *
 * @param address is optional, used when same source, eg: aave has multiple tokens and all of them can be fetched in one call.
 */
export interface AprFetcher {
  (address?: string): Promise<number>;
}

export const tokenAprMap: Record<string, AprFetcher> = {
  '0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0': lido,
  '0xf8fd466f12e236f4c96f7cce6c79eadb819abf58': aave,
  '0xd093fa4fb80d09bb30817fdcd442d4d02ed3e5de': aave,
  '0x02d60b84491589974263d922d9cc7a3152618ef6': aave,
  // Polygon
  '0x1aafc31091d93c3ff003cff5d2d8f7ba2e728425': overnight,
  '0x6933ec1ca55c06a894107860c92acdfd2dd8512f': overnight,
};
