import { Network } from '@/lib/constants/network';
import { AddressZero } from '@ethersproject/constants';

export const ADDRESSES = {
  [Network.MAINNET]: {
    BatchRelayer: {
      address: '0xdcdbf71A870cc60C6F9B621E28a7D3Ffd6Dd4965',
    },
    ETH: {
      address: AddressZero,
      decimals: 18,
      symbol: 'ETH',
    },
    BAL: {
      address: '0xba100000625a3754423978a60c9317c58a424e3d',
      decimals: 18,
      symbol: 'BAL',
    },
    USDC: {
      address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      decimals: 6,
      symbol: 'USDC',
    },
    USDT: {
      address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      decimals: 6,
      symbol: 'USDT',
    },
    WBTC: {
      address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
      decimals: 8,
      symbol: 'WBTC',
    },
    WETH: {
      address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      decimals: 18,
      symbol: 'WETH',
    },
    DAI: {
      address: '0x6b175474e89094c44da98b954eedeac495271d0f',
      decimals: 18,
      symbol: 'DAI',
    },
    STETH: {
      address: '0xae7ab96520de3a18e5e111b5eaab095312d7fe84',
      decimals: 18,
      symbol: 'STETH',
    },
    wSTETH: {
      address: '0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0',
      decimals: 18,
      symbol: 'wSTETH',
    },
    bbausd: {
      address: '0x7b50775383d3d6f0215a8f290f2c9e2eebbeceb2',
      decimals: 18,
      symbol: 'bbausd',
    },
    bbausdc: {
      address: '0x9210F1204b5a24742Eba12f710636D76240dF3d0',
      decimals: 18,
      symbol: 'bbausdc',
    },
    waDAI: {
      address: '0x02d60b84491589974263d922d9cc7a3152618ef6',
      decimals: 18,
      symbol: 'waDAI',
    },
    waUSDC: {
      address: '0xd093fa4fb80d09bb30817fdcd442d4d02ed3e5de',
      decimals: 6,
      symbol: 'waUSDC',
    },
  },
  // FIXME: Fill out config below for all networks
  [Network.BSC]: {
    // Visit https://balancer-faucet.on.fleek.co/#/faucet for test tokens
    BatchRelayer: {
      address: '',
    },
    BNB: {
      address: AddressZero,
      decimals: 18,
      symbol: 'BNB',
    },
    // TODO: Check that WBNB is used as the native wrapped token on BSC
    WBNB: {
      address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
      decimals: 18,
      symbol: 'WBNB',
    },
    BANANA: {
      address: '0x603c7f932ED1fc6575303D8Fb018fDCBb0f39a95',
      decimals: 18,
      symbol: 'BANANA',
    },
    ETH: {
      address: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
      decimals: 18,
      symbol: 'ETH',
    },
    BTCB: {
      address: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      decimals: 18,
      symbol: `BTCB`,
    },
    BUSD: {
      address: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
      decimals: 18,
      symbol: 'BUSD',
    },
    USDC: {
      address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
      decimals: 18,
      symbol: 'USDC',
    },
    DAI: {
      address: '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3',
      decimals: 18,
      symbol: 'DAI',
    },
    USDT: {
      address: '0x55d398326f99059fF775485246999027B3197955',
      decimals: 18,
      symbol: 'USDT',
    },
    STETH: {
      address: 'N/A',
      decimals: 18,
      symbol: 'STETH',
    },
    bbausd: {
      address: 'N/A',
      decimals: 18,
      symbol: 'bbausd',
    },
  },
  [Network.BSC_TESTNET]: {
    BNB: {
      address: AddressZero,
      decimals: 18,
      symbol: 'BNB',
    },
    WBNB: {
      address: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
      decimals: 18,
      symbol: 'WBNB',
    },
    BANANA: {
      address: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      decimals: 18,
      symbol: 'BANANA',
    },
    ETH: {
      address: 'N/A',
      decimals: 18,
      symbol: 'ETH',
    },
    BTCB: {
      address: 'N/A',
      decimals: 18,
      symbol: `BTCB`,
    },
    BUSD: {
      address: '0x9Fac5878Da670aDB06a21ff127C79e0De8BF3c53',
      decimals: 18,
      symbol: 'BUSD',
    },
    USDC: {
      address: 'N/A',
      decimals: 18,
      symbol: 'USDC',
    },
    DAI: {
      address: 'N/A',
      decimals: 18,
      symbol: 'DAI',
    },
    USDT: {
      address: 'N/A',
      decimals: 18,
      symbol: 'USDT',
    },
    STETH: {
      address: 'N/A',
      decimals: 18,
      symbol: 'STETH',
    },
    bbausd: {
      address: 'N/A',
      decimals: 18,
      symbol: 'bbausd',
    },
  },
};
