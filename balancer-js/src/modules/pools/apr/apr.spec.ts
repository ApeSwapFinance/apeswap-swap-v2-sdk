import { BigNumber } from '@ethersproject/bignumber';
import { expect } from 'chai';
import fetchMock from 'fetch-mock';
import { PoolApr } from './apr';
import { PoolsProvider } from '@/modules/pools/provider';
import { factories } from '@/test/factories';
import * as emissions from '@/modules/data/bal/emissions';
import type { PoolModel, Price, Token } from '@/types';
const { poolFactory, poolTokenFactory } = factories;

const wETH = poolTokenFactory
  .transient({ symbol: 'wETH' })
  .build({ weight: '0.5' });
const wstETH = poolTokenFactory
  .transient({ symbol: 'wstETH' })
  .build({ weight: '0.5' });
const tokens = [wstETH, wETH];

const poolData = poolFactory.build({
  address: 'pool',
  totalSwapFee: '1',
  totalLiquidity: '100',
  tokens,
});

const poolsMap = new Map();
poolsMap.set(poolData.address, poolData);

const repository = {
  find: (id: string) => Promise.resolve(poolsMap.get(id)),
  findBy: (param?: string, address?: string) =>
    Promise.resolve(poolsMap.get(address)),
};

const pools = new PoolsProvider(repository);

const buildRepository = <T>(item: T) => ({
  find: () => Promise.resolve(item),
  findBy: () => Promise.resolve(item),
});

const prices = buildRepository(<Price>{ usd: '1' });
const meta = buildRepository(<Token>{ decimals: 18 });
const gauges = buildRepository(undefined);

const baseGauge = {
  id: 'gauge',
  name: 'gauge',
  address: 'address',
  poolAddress: '1',
  totalSupply: 1,
  workingSupply: 1,
  relativeWeight: 1,
};

const baseRewardToken = {
  token: '0x0',
  distributor: '0x0',
  periodFinish: BigNumber.from(Math.round(Date.now() / 1000 + 7 * 86400)),
  rate: BigNumber.from('31709792000'), // 1 / 365 / 86400 scaled to 1e18
  integral: BigNumber.from('0'),
  lastUpdate: BigNumber.from('0'),
};

describe('pool apr', () => {
  describe('.swapFees', () => {
    // 1% / day, 365% / year
    it('are 36500 bsp APR', async () => {
      const pool = (await pools.find('pool')) as PoolModel;
      const apr = new PoolApr(pool, 0, prices, meta, pools, gauges).swapFees(0);
      expect(apr).to.eq(36500);
    });
  });

  describe('.tokenAprs', () => {
    before(() => {
      fetchMock.get('https://stake.lido.fi/api/apr', {
        data: { eth: '1', steth: '2' },
      });
    });

    after(() => {
      fetchMock.reset();
    });

    describe('lido token', () => {
      // It will equal 1%, because rate is 2% but weight is 50%
      it('are 100 bsp (1%)', async () => {
        const pool = (await pools.find('pool')) as PoolModel;
        const apr = await new PoolApr(
          pool,
          0,
          prices,
          meta,
          pools,
          gauges
        ).tokenAprs();
        expect(apr).to.eq(100);
      });
    });

    describe('nested pools', () => {
      const bptToken = poolTokenFactory.build({
        address: 'pool',
        decimals: 18,
        balance: '1',
        weight: '0.5',
      });
      const poolWithBptData = poolFactory.build({
        address: 'poolWithBpt',
        tokens: [wETH, bptToken],
        totalSwapFee: '1',
        totalLiquidity: '100',
      });
      poolsMap.set(poolWithBptData.address, poolWithBptData);

      it('are 100 bsp (1%)', async () => {
        const poolWithBpt = (await pools.find('poolWithBpt')) as PoolModel;

        const apr = await new PoolApr(
          poolWithBpt,
          0,
          prices,
          meta,
          pools,
          gauges
        ).tokenAprs();
        expect(apr).to.eq((36500 + 100) / 2);
      });
    });
  });

  describe('.balAprs', () => {
    // one token is works with 40% of it's value
    it('has bal rewards as ~40% apr', async () => {
      const now = Math.round(new Date().getTime() / 1000);
      const balEmissions = emissions.between(now, now + 365 * 86400);

      const pool = (await pools.find('pool')) as PoolModel;
      const gauge = {
        ...baseGauge,
        workingSupply: balEmissions,
      };
      const gauges = buildRepository(gauge);

      const apr = await new PoolApr(
        pool,
        0,
        prices,
        meta,
        pools,
        gauges
      ).balApr();

      expect(apr).to.eq(4000);
    });
  });

  describe('.rewardsAprs', () => {
    it('has token rewards', async () => {
      const rewardTokens = {
        address1: baseRewardToken,
        address2: baseRewardToken,
      };
      const gauge = {
        ...baseGauge,
        rewardTokens,
      };
      const gauges = buildRepository(gauge);
      const pool = (await pools.find('pool')) as PoolModel;
      const apr = await new PoolApr(
        pool,
        0,
        prices,
        meta,
        pools,
        gauges
      ).rewardsApr();

      expect(apr).to.eq(20000);
    });
  });
});
