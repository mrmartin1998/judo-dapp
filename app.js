// app.js

// Contract addresses and ABIs (Update these to your deployed contracts)
const judoBeltStorageAddress = '0x85a874d10380F2E8a03B9d524AF398FC16dDF7F7';
const judoUserRegistrationAddress = '0xbd9c9612A0E3C6aB28E699940f5aA0391EdCa96b';
const judoBeltPromotionAddress = '0x90F3D57Bf53036DD69B9958a87004Df4aF4D21CF';

const judoBeltStorageABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "admin",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
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
          "name": "",
          "type": "address"
        }
      ],
      "name": "senseis",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
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
          "internalType": "address[]",
          "name": "senseiAddresses",
          "type": "address[]"
        }
      ],
      "name": "initializeSenseis",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
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
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "admin",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
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
          "name": "",
          "type": "address"
        }
      ],
      "name": "senseis",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
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
          "internalType": "address[]",
          "name": "senseiAddresses",
          "type": "address[]"
        }
      ],
      "name": "initializeSenseis",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
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
  ]; // Replace with actual ABI of JudoBeltPromotion

// Contract instances
let judoBeltStorage, judoUserRegistration, judoBeltPromotion;

// Initialize Web3 and contracts
async function initWeb3() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            // Request account access
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            setupContracts();
        } catch (error) {
            console.error("User denied web3 access:", error);
        }
    } else if (window.web3) {
        web3 = new Web3(window.web3.currentProvider);
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
    const fromAddress = document.getElementById('walletAddress').value; 

    try {
        await judoBeltPromotion.methods.promoteStudent(studentAddress).send({ from: fromAddress });
        console.log('Promotion successful');
    } catch (error) {
        console.error('Error promoting student:', error);
    }
}

// Function to get user belt level
async function getStudentBeltLevel() {
    const userAddress = document.getElementById('studentBeltAddress').value;

    try {
        const beltLevel = await judoBeltStorage.methods.getBeltLevel(userAddress).call();
        console.log(`The user's belt level is: ${beltLevel}`);
    } catch (error) {
        console.error('Error getting user belt level:', error);
    }
}

window.addEventListener('load', initWeb3);