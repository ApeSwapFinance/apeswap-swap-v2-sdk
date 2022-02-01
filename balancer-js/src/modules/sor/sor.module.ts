import { SOR, TokenPriceService } from '@balancer-labs/sor';
import { Provider, JsonRpcProvider } from '@ethersproject/providers';
import { SubgraphPoolDataService } from './pool-data/subgraphPoolDataService';
import { CoingeckoTokenPriceService } from './token-price/coingeckoTokenPriceService';
import {
    SubgraphClient,
    createSubgraphClient,
} from '@/modules/subgraph/subgraph';
import {
    BalancerNetworkConfig,
    BalancerSdkConfig,
    BalancerSdkSorConfig,
} from '@/types';
import { SubgraphTokenPriceService } from './token-price/subgraphTokenPriceService';
import { getNetworkConfig } from '@/modules/sdk.helpers';

export class Sor extends SOR {
    constructor(sdkConfig: BalancerSdkConfig) {
        const network = getNetworkConfig(sdkConfig);
        const sorConfig = Sor.getSorConfig(sdkConfig);
        const provider = new JsonRpcProvider(sdkConfig.rpcUrl);
        const subgraphClient = createSubgraphClient(network.subgraphUrl);

        const poolDataService = Sor.getPoolDataService(
            network,
            sorConfig,
            provider,
            subgraphClient
        );

        const tokenPriceService = Sor.getTokenPriceService(
            network,
            sorConfig,
            subgraphClient
        );

        super(provider, network, poolDataService, tokenPriceService);
    }

    private static getSorConfig(
        config: BalancerSdkConfig
    ): BalancerSdkSorConfig {
        return {
            tokenPriceService: 'coingecko',
            poolDataService: 'subgraph',
            fetchOnChainBalances: true,
            ...config.sor,
        };
    }

    private static getPoolDataService(
        network: BalancerNetworkConfig,
        sorConfig: BalancerSdkSorConfig,
        provider: Provider,
        subgraphClient: SubgraphClient
    ) {
        return typeof sorConfig.poolDataService === 'object'
            ? sorConfig.poolDataService
            : new SubgraphPoolDataService(
                  subgraphClient,
                  provider,
                  network,
                  sorConfig
              );
    }

    private static getTokenPriceService(
        network: BalancerNetworkConfig,
        sorConfig: BalancerSdkSorConfig,
        subgraphClient: SubgraphClient
    ): TokenPriceService {
        if (typeof sorConfig.tokenPriceService === 'object') {
            return sorConfig.tokenPriceService;
        } else if (sorConfig.tokenPriceService === 'subgraph') {
            new SubgraphTokenPriceService(subgraphClient, network.weth);
        }

        return new CoingeckoTokenPriceService(network.chainId);
    }
}