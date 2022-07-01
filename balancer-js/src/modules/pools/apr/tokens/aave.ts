import { AprFetcher } from '../tokens';
import { BigNumber } from 'ethers';
import { utils } from 'ethers';
const { formatUnits } = utils;

// can be fetched from subgraph
// aave-js: supplyAPR = graph.liquidityRate = core.getReserveCurrentLiquidityRate(_reserve)
// or directly from RPC:
// wrappedAaveToken.LENDING_POOL.getReserveCurrentLiquidityRate(mainTokenAddress)

export const wrappedTokensMap = {
  // USDT
  '0xf8fd466f12e236f4c96f7cce6c79eadb819abf58': {
    aToken: '0x3ed3b47dd13ec9a98b44e6204a523e766b225811',
    underlying: '0xdac17f958d2ee523a2206206994597c13d831ec7',
  },
  // USDC
  '0xd093fa4fb80d09bb30817fdcd442d4d02ed3e5de': {
    aToken: '0xbcca60bb61934080951369a648fb03df4f96263c',
    underlying: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  },
  // DAI
  '0x02d60b84491589974263d922d9cc7a3152618ef6': {
    aToken: '0x028171bca77440897b824ca71d1c56cac55b68a3',
    underlying: '0x6b175474e89094c44da98b954eedeac495271d0f',
  },
};

const aTokens = Object.values(wrappedTokensMap).map((t) => t.aToken);
const underlyingAssets = Object.values(wrappedTokensMap).map(
  (t) => t.underlying
);
const underlyingToWrapped = Object.fromEntries(
  Object.keys(wrappedTokensMap).map((wrapped) => [
    wrappedTokensMap[wrapped as keyof typeof wrappedTokensMap].underlying,
    wrapped,
  ])
);

// Subgraph
//
const endpoint = 'https://api.thegraph.com/subgraphs/name/aave/protocol-v2';
const query = `
  query getReserves($aTokens: [String!], $underlyingAssets: [Bytes!]) {
    reserves(
      where: {
        aToken_in: $aTokens
        underlyingAsset_in: $underlyingAssets
        isActive: true
      }
    ) {
      underlyingAsset
      liquidityRate
    }
  }
`;

interface ReserveResponse {
  data: {
    reserves: [
      {
        underlyingAsset: string;
        liquidityRate: string;
      }
    ];
  };
}

let aprTtl = 0;
let aprs: Record<string, number>;

/**
 * Is fetching and parsing aave APRs from a subgraph
 *
 * @returns aave aprs in bsp
 */
const getAprs = async (): Promise<Record<string, number>> => {
  try {
    const graphqlQuery = {
      operationName: 'getReserves',
      query,
      variables: { aTokens, underlyingAssets },
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(graphqlQuery),
    });

    const {
      data: { reserves },
    } = (await response.json()) as ReserveResponse;

    const aprEntries = reserves.map((r) => [
      underlyingToWrapped[r.underlyingAsset],
      // Note: our assumption is frontend usage, it's not a good source where more accuracy is needed.
      Math.round(
        parseFloat(formatUnits(BigNumber.from(r.liquidityRate), 25)) * 100
      ),
    ]);

    return Object.fromEntries(aprEntries);
  } catch (error) {
    console.log(error);

    return Object.fromEntries(
      Object.keys(wrappedTokensMap).map((key) => [key, 0])
    );
  }
};

/**
 * Caching logic around APR fetching
 *
 * @returns cached APRs for aave tokens
 */
export const aave: AprFetcher = async (address?: string) => {
  if (!address) {
    throw 'needs a wrapped token address, eg: wrapped aDAI';
  }

  // cache for 1h
  if (Date.now() > aprTtl) {
    aprs = await getAprs();
    aprTtl = Date.now() + 1 * 60 * 60 * 1000;
  }

  return aprs[address];
};

// TODO: RPC multicall
// always upto date
// const lendingPoolAddress = '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9';
