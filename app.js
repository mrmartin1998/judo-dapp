// app.js

// Contract addresses and ABIs (Update these to your deployed contracts)
const judoBeltStorageAddress = '0x32Ed67057269f7b3c869A7C89bceE1301937c595';
const judoUserRegistrationAddress = '0xB0906f2b3C7b09F4E3B03f8A334adA2352C44B8B';
const judoBeltPromotionAddress = '0x620FDC5e8DCb116dC72fc1dCfa6411aDA53e42EA';

const judoBeltStorageABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "judoka",
          "type": "address"
        },
        {
          "internalType": "enum JudoBeltStorage.BeltLevel",
          "name": "belt",
          "type": "uint8"
        }
      ],
      "name": "setBeltLevel",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "judoka",
          "type": "address"
        }
      ],
      "name": "getBeltLevel",
      "outputs": [
        {
          "internalType": "enum JudoBeltStorage.BeltLevel",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newAdmin",
          "type": "address"
        }
      ],
      "name": "transferAdminship",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]; // Replace with actual ABI of JudoBeltStorage
const judoUserRegistrationABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_storageAddress",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "userAddress",
          "type": "address"
        },
        {
          "internalType": "enum JudoBeltStorage.BeltLevel",
          "name": "belt",
          "type": "uint8"
        }
      ],
      "name": "registerUser",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]; // Replace with actual ABI of JudoUserRegistration
const judoBeltPromotionABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_storageAddress",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "judoka",
          "type": "address"
        }
      ],
      "name": "promoteJudoka",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]; // Replace with actual ABI of JudoBeltPromotion

// Contract instances
let judoBeltStorage, judoUserRegistration, judoBeltPromotion;

// Initialize Web3
async function initWeb3() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' }); // Request account access
            setupContracts();
        } catch (error) {
            console.error("User denied web3 access:", error);
        }
    } else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider); // Legacy dapp browsers...
    } else {
        console.error('Non-Ethereum browser detected. Consider trying MetaMask!');
    }
}

function setupContracts() {
    judoBeltStorage = new web3.eth.Contract(judoBeltStorageABI, judoBeltStorageAddress);
    judoUserRegistration = new web3.eth.Contract(judoUserRegistrationABI, judoUserRegistrationAddress);
    judoBeltPromotion = new web3.eth.Contract(judoBeltPromotionABI, judoBeltPromotionAddress);
    console.log('Contracts are set up and ready to interact with.');
}

// Function to register user
async function registerUser() {
    const beltLevel = document.getElementById('beltLevel').value;
    const fromAddress = document.getElementById('walletAddress').value;

    try {
        await judoUserRegistration.methods.registerUser(fromAddress, beltLevel).send({ from: fromAddress });
        console.log('Registration successful');
    } catch (error) {
        console.error('Error registering user:', error);
    }
}

// Function to promote student
async function promoteStudent() {
    const studentAddress = document.getElementById('studentAddress').value;
    const fromAddress = document.getElementById('walletAddress').value; // Assumes the promoter uses their own address

    try {
        await judoBeltPromotion.methods.promoteStudent(studentAddress).send({ from: fromAddress });
        console.log('Promotion successful');
    } catch (error) {
        console.error('Error promoting student:', error);
    }
}

// Function to get user belt level
async function getUserBeltLevel() {
    const userAddress = document.getElementById('studentBeltAddress').value; // User whose belt level you want to check

    try {
        const beltLevel = await judoBeltStorage.methods.getBeltLevel(userAddress).call();
        console.log(`The user's belt level is: ${beltLevel}`);
    } catch (error) {
        console.error('Error getting user belt level:', error);
    }
}

window.addEventListener('load', async () => {
    initWeb3();
});
