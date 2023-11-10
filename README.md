[![CI/CD to deploy Usdm Management Portal](https://github.com/inspector44/usdm/actions/workflows/nextjs.yml/badge.svg?branch=main)](https://github.com/inspector44/usdm/actions/workflows/nextjs.yml)
[![CI for building contract](https://github.com/inspector44/usdm/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/inspector44/usdm/actions/workflows/main.yml)
[![Coverage](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/inspector44/2cfa2783ab5d2eb2b178d1cf96fa0a29/raw/9aba0aeeb49b93d3fac212dde3f63e8e1e45e84f/usdm-cobertura-coverage.json)](https://github.com/inspector44/usdm/actions/workflows/main.yml)



# USDM Stablecoin on Mina Protocol

This repository hosts the USDM stablecoin zkApp project, which comprises two main components: the user interface (UI) and the contracts project.

## Overview

The USDM stablecoin project aims to create a cryptocurrency that is pegged to the US Dollar (USD) on a 1:1 basis. This stablecoin provides the benefits of blockchain technology, such as transparency, security, and immutability, while maintaining a stable value equivalent to fiat currency. It achieves this through a collateral-backed framework, where each minted USDM token is backed by an equivalent amount of USD held in a reserve.

 - For more details : [USDM Project Notion Page](https://uneven-asparagus-47e.notion.site/USDM-Stablecoin-6217ce83e3e94f6ab174a1abe3ad7c5c)

## Future Plans: Exploring USDC Integration

While the current focus remains on developing and refining the USDM stablecoin, there's an ongoing exploration to possibly pivot or expand the project to integrate USDC. This integration would tap into USDC's global infrastructure, providing additional liquidity, interoperability, and a wider range of financial services, further enhancing the capabilities and reach of the USDM stablecoin.

To explore the potential of USDC integration: [USDC for Developers | Circle.](https://www.circle.com/en/usdc/developers)

## Contracts Project

The contracts project contains the smart contracts responsible for the minting, burning, and managing of the USDM stablecoin. These contracts are built on Mina Protocol's zkApps usin o1js, utilizing zero-knowledge proofs to ensure privacy and scalability.

### Key Features:

- **Minting & Burning Operations**: Users can mint new USDM by depositing USD into an off-chain reserve. For every USDM token minted, an equivalent amount in USD is locked in the reserve. Conversely, users can burn USDM to withdraw their collateral, thereby ensuring the value of USDM remains stable and tied to the USD.

- **Oracle Integration**: The system includes an oracle or ZK-proof system to verify off-chain collateral status, ensuring transparency and security in minting and burning operations.

## UI Project

The UI project provides an interface for users to interact with the USDM stablecoin. It is designed to be intuitive, allowing users to mint, burn, and transfer USDM with ease.
 - Connect with your favorite wallet and get your usdm! [USDM Management Portal](https://inspector44.github.io/usdm/)

### Key Features:

- **Wallet Integration:** Users can connect their Mina Protocol wallets to the UI to interact with the USDM stablecoin.
- **Transaction Management:** The UI provides a seamless experience for managing transactions related to USDM, including minting, burning, and transferring.

## License

The USDM stablecoin project is open-source software licensed under the Apache 2.0.
