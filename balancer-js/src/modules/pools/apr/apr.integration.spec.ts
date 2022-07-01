import { expect } from 'chai';
import { PoolApr } from '@/modules/pools/apr/apr';
import { PoolsProvider } from '@/modules/pools/provider';
import {
  CoingeckoPriceRepository,
  StaticTokenProvider,
  LiquidityGaugeSubgraphRPCProvider,
  PoolsSubgraphRepository,
} from '@/modules/data';
import { BALANCER_NETWORK_CONFIG } from '@/lib/constants/config';
import { JsonRpcProvider } from '@ethersproject/providers';

const networkConfig = BALANCER_NETWORK_CONFIG[1];
const provider = new JsonRpcProvider('http://127.0.0.1:8545/', 1);
const poolsRepository = new PoolsSubgraphRepository(
  networkConfig.urls.subgraph
);
const poolsProvider = new PoolsProvider(poolsRepository);
const liquidityGauges = new LiquidityGaugeSubgraphRPCProvider(
  networkConfig.urls.gaugesSubgraph,
  networkConfig.addresses.contracts.multicall,
  networkConfig.addresses.contracts.gaugeController,
  provider
);

const poolId =
  '0xa6f548df93de924d73be7d25dc02554c6bd66db500020000000000000000000e';

describe('happy case', () => {
  it('has predictable output', async () => {
    const pool = await poolsProvider.find(poolId);
    if (pool) {
      const priceProvider = new CoingeckoPriceRepository(
        [
          ...pool.tokens.map((t) => t.address),
          '0xba100000625a3754423978a60c9317c58a424e3D', // needs BAL for total value of emissions in USD
        ],
        1
      );
      const metaProvider = new StaticTokenProvider(pool.tokens);
      const aprs = new PoolApr(
        pool,
        0,
        priceProvider,
        metaProvider,
        poolsProvider,
        liquidityGauges
      );

      const apr = await aprs.apr();
      console.log(apr);
      expect(apr.min).to.eq(1);
    }
  }).timeout(200000);
});
