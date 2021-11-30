import dotenv from 'dotenv';
import { parseFixed, BigNumber } from '@ethersproject/bignumber';
import { BalancerSDK, Network, ConfigSdk, SUBGRAPH_URLS, SwapType } from '../src/index';
import { AAVE_DAI, AAVE_USDC, AAVE_USDT, STABAL3PHANTOM } from './constants';

dotenv.config();

async function runQueryBatchSwapWithSor() {
    const config: ConfigSdk = {
        network: Network.KOVAN,
        rpcUrl: `https://kovan.infura.io/v3/${process.env.INFURA}`,
        subgraphUrl: SUBGRAPH_URLS[Network.KOVAN]
    } 
    console.log(config.subgraphUrl);
    const balancer = new BalancerSDK(config);

    // Example showing how to join bb-a-usd pool by swapping stables > BPT
    let queryResult = await balancer.swaps.queryBatchSwapWithSor({
        tokensIn: [AAVE_DAI.address, AAVE_USDC.address, AAVE_USDT.address],
        tokensOut: [STABAL3PHANTOM.address, STABAL3PHANTOM.address, STABAL3PHANTOM.address],
        swapType: SwapType.SwapExactIn,
        amounts: [parseFixed('100', 18), parseFixed('100', 6), parseFixed('100', 6)],
        fetchPools: true
    });
    console.log(`\n******* stables > BPT ExactIn`);
    console.log(queryResult.swaps);
    console.log(queryResult.assets);
    console.log(queryResult.returnAmounts.toString()); 

    // Example showing how to exit bb-a-usd pool by swapping BPT > stables
    queryResult = await balancer.swaps.queryBatchSwapWithSor({
        tokensIn: [STABAL3PHANTOM.address, STABAL3PHANTOM.address, STABAL3PHANTOM.address],
        tokensOut: [AAVE_DAI.address, AAVE_USDC.address, AAVE_USDT.address],
        swapType: SwapType.SwapExactIn,
        amounts: [parseFixed('1', 18), parseFixed('1', 18), parseFixed('1', 18)],
        fetchPools: true
    });
    console.log(`\n******* BPT > stables ExactIn`);
    console.log(queryResult.swaps);
    console.log(queryResult.assets);
    console.log(queryResult.returnAmounts.toString());

    queryResult = await balancer.swaps.queryBatchSwapWithSor({
        tokensIn: [STABAL3PHANTOM.address, STABAL3PHANTOM.address, STABAL3PHANTOM.address],
        tokensOut: [AAVE_DAI.address, AAVE_USDC.address, AAVE_USDT.address],
        swapType: SwapType.SwapExactOut,
        amounts: queryResult.returnAmounts.map(amt => BigNumber.from(amt).abs()),
        fetchPools: true
    });
    console.log(`\n******* BPT > stables Exact Out`);
    console.log(queryResult.swaps);
    console.log(queryResult.assets);
    console.log(queryResult.returnAmounts.toString());
}

// ts-node ./examples/queryBatchSwapWithSor.ts
runQueryBatchSwapWithSor();