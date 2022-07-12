<img src="logo.svg" alt="ApeSwap" height="160px"> <img src="logo-b.svg" alt="Balancer" height="64px"> 

# ApeSwap Swap V2 SDK (`balancer-sdk`)
[![Docs](https://img.shields.io/badge/docs-%F0%9F%93%84-yellow)](https://apeswap.gitbook.io/apeswap-finance/welcome/master)
[![CI Status](https://github.com/ApeSwapFinance/apeswap-swap-v2-sdk/actions/workflows/ci.yml/badge.svg)](https://github.com/ApeSwapFinance/apeswap-swap-v2-sdk/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/License-GPLv3-green.svg)](https://www.gnu.org/licenses/gpl-3.0)

This repository contains the code for the ApeSwap DEX V2. This project is a fork of [balancer-v2-monorepo](https://github.com/balancer-labs/balancer-v2-monorepo). For more further information please see their detailed [documentation](https://docs.balancer.fi/) as we build out ours.

## Pulling Upstream Changes
`balancer-sdk` is an actively maintained repository. The unaltered Balancer SDK code lives in the [balancer-v2](https://github.com/ApeSwapFinance/apeswap-swap-v2-sdk/tree/balancer-v2) branch. To pull in new updates to that branch run the following: 

```bash
git checkout balancer-v2
git fetch upstream
git merge upstream/master
```

Now the new updates will be in the [balancer-v2](https://github.com/ApeSwapFinance/apeswap-swap-v2-sdk/tree/balancer-v2) branch. These updates can then be merged into a feature branch off of `main` reconcile the updates.  

```
git checkout main
git checkout -b feature/<feature-name>
git merge balancer-v2
```

## Balancer Docs
Balancer is a community-driven protocol, automated portfolio manager, liquidity provider, and price sensor that empowers decentralized exchange and the automated portfolio management of tokens on the Ethereum blockchain and other EVM compatible systems.

This SDK gives developers access to methods and examples for formatting data and exectuting transaction on the Balancer V2 Protocol.

[balancer-js](./balancer-js/README.md) A JavaScript SDK which provides commonly used utilties for interacting with Balancer Protocol V2.

[balancer-py](./balancer-py/README.md) Python tools for interacting with Balancer Protocol V2 in Python.

[balancer-sor](./balancer-sor/README.md) Smart Order Router, or SOR, is a Javascript off-chain linear optimization of routing orders across pools for best price execution.

### Useful Info

[Balancer V2 Monorepo](https://github.com/balancer-labs/balancer-v2-monorepo) The repository contains the Balancer Protocol V2 core smart contracts, including the Vault and standard Pools, along with their tests, configuration, and deployment information.

[Balancer Documentation](https://docs.balancer.fi/) Documention including high level overviews of Balancer Protocol, FAQs and walkthroughs.

### Contributing/Suggestions

Balancer is a community driven project and we welcome external contributions and feedback. Please see the Contributing guides within each project for guidance on how to submit code. If you have any suggestions or requests please open an issue in this repo with some further details and we'll be happy to investigate further.