# Ethereum Judo Belt System dApp

## Description

The Ethereum Judo Belt System dApp is a blockchain-based decentralized application (dApp) on the Ethereum network. It's designed to manage and track the progression of students in a Judo Belt System. The dApp enables senseis (black belt instructors) to seamlessly register new students, promote them through different belt levels, and view their current belt levels in real-time, all secured by the Ethereum blockchain.

## Technologies Used

- **Solidity:** Smart contract development on the Ethereum blockchain.
- **HTML/CSS/JavaScript:** Front-end user interface.
- **Truffle:** Development framework for Ethereum.
- **Ganache:** Personal blockchain for Ethereum development.
- **Web3.js:** Ethereum JavaScript API for interacting with the blockchain.
- **MetaMask:** Browser-based Ethereum wallet.

## Modular Smart Contract Architecture

The dApp's architecture is centered around modular smart contracts, enhancing flexibility and scalability. This design allows for easier updates and future expansions. The main contracts include:

1. **JudoBeltStorage.sol:** Central contract for managing judokas' belt levels.
2. **JudoUserRegistration.sol:** Manages the registration of new judokas, ensuring that only authorized instructors can add new students.
3. **JudoBeltPromotion.sol:** Handles the promotion of judokas, updating their belt levels according to Judo standards.

Each contract is designed to be independent yet interconnected, providing a robust and efficient system for managing the Judo Belt System.

## Front-End Interface

The front-end is a user-friendly interface developed with HTML, CSS, and JavaScript. It interacts with the smart contracts via Web3.js, offering functionalities such as:

- Registering new judokas.
- Promoting students to higher belts.
- Viewing real-time belt levels.

### Installation & Setup

1. **Clone the Repository:** Get the code on your local machine.
2. **Install Truffle and Ganache:** Set up a local blockchain environment for testing and development.
3. **Compile and Deploy Smart Contracts:** Use Truffle to deploy contracts on your local blockchain.
4. **Connect to MetaMask:** Ensure MetaMask is configured for your local Ethereum blockchain.

### Usage Guide

- Open `index.html` in your browser to interact with the dApp.
- Connect MetaMask to transact on the Ethereum network.
- Register, promote, and view judokas' belt levels directly through the dApp.

## Roadmap

Future updates will focus on:

- Improved security measures and access controls.
- Expanded features like comprehensive student profiles and achievement tracking.
- Enhanced UI/UX for a more engaging user experience.
