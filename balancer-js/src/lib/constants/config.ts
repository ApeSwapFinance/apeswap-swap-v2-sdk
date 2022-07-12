import { Network } from './network';
import { BalancerNetworkConfig } from '@/types';

export const apeswapVault = '0x000a9e000a35f2cBbE4326578E19dd8Fb4913719';

export const APESWAP_NETWORK_CONFIG: Record<Network, BalancerNetworkConfig> = {
  [Network.BSC]: {
    chainId: Network.BSC, //56
    addresses: {
      contracts: {
        vault: '0x000a9e000a35f2cBbE4326578E19dd8Fb4913719',
        multicall: '0xC50F4c1E81c873B2204D7eFf7069Ffec6Fbe136D',
      },
      tokens: {
        wrappedNativeAsset: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
      },
    },
    urls: {
      subgraph: '',
    },
    pools: {},
  },
  [Network.BSC_DUMMY]: {
    chainId: Network.BSC, //56
    addresses: {
      contracts: {
        vault: '0x42B7888FFf938C54faeDF52485C8323c4Fc8C99B',
        multicall: '0xC50F4c1E81c873B2204D7eFf7069Ffec6Fbe136D',
      },
      tokens: {
        wrappedNativeAsset: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
      },
    },
    urls: {
      subgraph: 'http://65.108.138.33:8000/subgraphs/name/apeswap/balancer-v2',
    },
    pools: {},
  },
  [Network.BSC_TESTNET]: {
    chainId: Network.BSC_TESTNET, //97
    addresses: {
      contracts: {
        vault: '0x000a9e000a35f2cBbE4326578E19dd8Fb4913719',
        multicall: '0x7b6838b362f05bA2a0CAA8F9c1B34F3D619e7413',
      },
      tokens: {
        wrappedNativeAsset: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
      },
    },
    urls: {
      subgraph: '',
    },
    pools: {},
  },
  // NOTE: Balancer mainnet config
  [Network.MAINNET]: {
    chainId: Network.MAINNET as any, //1
    addresses: {
      contracts: {
        vault: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
        multicall: '0xeefba1e63905ef1d7acba5a8513c70307c1ce441',
        lidoRelayer: '0xdcdbf71A870cc60C6F9B621E28a7D3Ffd6Dd4965',
      },
      tokens: {
        wrappedNativeAsset: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        lbpRaisingTokens: [
          '0x6B175474E89094C44Da98b954EedeAC495271d0F',
          '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        ],
        stETH: '0xae7ab96520de3a18e5e111b5eaab095312d7fe84',
        wstETH: '0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0',
      },
    },
    urls: {
      subgraph:
        'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-v2',
    },
    pools: {
      wETHwstETH: {
        id: '0x32296969ef14eb0c6d29669c550d4a0449130230000200000000000000000080',
        address: '0x32296969ef14eb0c6d29669c550d4a0449130230',
      },
    },
  },
};

export const networkAddresses = (
  chainId: number
): BalancerNetworkConfig['addresses'] =>
  APESWAP_NETWORK_CONFIG[chainId as Network].addresses;
