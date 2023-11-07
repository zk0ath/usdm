# USDM Stablecoin on Mina Protocol

This repository hosts the USDM stablecoin zkApp project, which comprises two main components: the user interface (UI) and the contracts project.

## Overview

The USDM stablecoin project aims to create a cryptocurrency that is pegged to the US Dollar (USD) on a 1:1 basis. This stablecoin provides the benefits of blockchain technology, such as transparency, security, and immutability, while maintaining a stable value equivalent to fiat currency. It achieves this through a collateral-backed framework, where each minted USDM token is backed by an equivalent amount of USD held in a reserve.

 - For more details : https://uneven-asparagus-47e.notion.site/Minting-and-Burning-Process-Diagram-cdf9915414d5493ba8d3885fa0641eb4?pvs=4

## Contracts Project

The contracts project contains the smart contracts responsible for the minting, burning, and managing of the USDM stablecoin. These contracts are built on Mina Protocol's zkApps usin o1js, utilizing zero-knowledge proofs to ensure privacy and scalability.

### Key Features:

- **Minting & Burning Operations**: Users can mint new USDM by depositing USD into an off-chain reserve. For every USDM token minted, an equivalent amount in USD is locked in the reserve. Conversely, users can burn USDM to withdraw their collateral, thereby ensuring the value of USDM remains stable and tied to the USD.

- **Oracle Integration**: The system includes an oracle or ZK-proof system to verify off-chain collateral status, ensuring transparency and security in minting and burning operations.

## UI Project

The UI project provides an interface for users to interact with the USDM stablecoin. It is designed to be intuitive, allowing users to mint, burn, and transfer USDM with ease.
 - Connect with your favorite wallet and get your usdm! https://kadiralan.github.io/usdm/

### Key Features:

- **Wallet Integration:** Users can connect their Mina Protocol wallets to the UI to interact with the USDM stablecoin.
- **Transaction Management:** The UI provides a seamless experience for managing transactions related to USDM, including minting, burning, and transferring.

## Getting Started

to-do

## Contributing

to-do

## License

The USDM stablecoin project is open-source software licensed under the Apache 2.0.
