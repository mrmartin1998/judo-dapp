# Ethereum Judo Belt System dApp

## Description

The Ethereum Judo Belt System dApp is a decentralized application that leverages the Ethereum blockchain to manage and track students' progress in a Judo Belt System. It allows senseis (black belt instructors) to register new students, promote them to higher belt levels, and view their current belt levels in real-time.

## Technologies Used

- Solidity (Smart Contract Development)
- HTML/CSS/JavaScript (Front-end)
- Truffle (Development Framework)
- Ganache (Local Blockchain for Testing)
- Web3.js (Library for Interacting with the Ethereum Network)
- MetaMask (Ethereum Wallet Integration)

## Smart Contract

The core of the dApp is the smart contract (JudoBeltSystem.sol), responsible for storing student data and managing promotions. Here are the main functions in the smart contract:

1. `constructor`: The constructor function is called when the contract is deployed. It takes an array of addresses (`senseiWallets`) representing the black belt senseis.

2. `registerUser`: This function allows senseis to register new students with their initial belt level. It takes the initial belt level as an argument and adds the student's address and belt level to the `users` mapping.

3. `promoteStudent`: Senseis can use this function to promote a registered student to a higher belt level. It takes the student's address and the new belt level as arguments and updates the student's belt level in the `users` mapping.

4. `getBeltLevel`: This function allows anyone to query a student's current belt level by providing the student's address.

## Front-End

The front-end consists of an `index.html` file and an `app.js` file. The HTML provides the user interface, while the JavaScript code interacts with the smart contract and updates the UI based on blockchain data.

### Installation

1. Clone the repository to your local machine.
2. Install Truffle and Ganache to set up a local blockchain environment.
3. Compile and deploy the smart contract to the local blockchain.
4. Update the `contractAddress` variable in the `app.js` file with the deployed contract address.

### Usage

1. Open the `index.html` file in a web browser.
2. Connect your MetaMask wallet to the dApp (make sure you have some test Ether on the local blockchain).
3. Register new students, promote existing students, and check their belt levels.

### Roadmap

- Enhance user authentication and access control for more secure interactions.
- Implement additional features, such as student profiles, achievements, and certificates.
- Improve the UI/UX with styling and interactive elements.
