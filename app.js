// app.js

const judoBeltStorageAddress = '0xea8d4db3Bb29A24C553f2A4761a8C0761046B138';
const judoUserRegistrationAddress = '0xD7532D6Fa440D0CaCed4a30c5778c4C200F3DF42';
const judoBeltPromotionAddress = '0xD437B0eB80a7bD474684ed95A3e266F97BfCD3a5';

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
      "inputs": [],
      "name": "beltPromotionAddress",
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
      "name": "judokaBelts",
      "outputs": [
        {
          "internalType": "enum IJudoBeltStorage.BeltLevel",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "userRegistrationAddress",
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
          "name": "_userRegistrationAddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_beltPromotionAddress",
          "type": "address"
        }
      ],
      "name": "setContractAddresses",
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
        },
        {
          "internalType": "enum IJudoBeltStorage.BeltLevel",
          "name": "belt",
          "type": "uint8"
        },
        {
          "internalType": "address",
          "name": "caller",
          "type": "address"
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
          "internalType": "enum IJudoBeltStorage.BeltLevel",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ];
const judoUserRegistrationABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "storageAddress",
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
          "name": "user",
          "type": "address"
        }
      ],
      "name": "registerUser",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
const judoBeltPromotionABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "storageAddress",
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

// Initialize Web3 and contracts
async function initWeb3() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            setupContracts();
        } catch (error) {
            console.error("User denied web3 access:", error);
            displayError("User denied web3 access.");
        }
    } else if (window.web3) {
        web3 = new Web3(window.web3.currentProvider);
    } else {
        console.error('Non-Ethereum browser detected. Consider trying MetaMask!');
        displayError('Non-Ethereum browser detected. Consider trying MetaMask!');
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
        displayMessage('Registration successful.');
    } catch (error) {
        console.error('Error registering user:', error);
        displayError('Error registering user.');
    }
}

// Function to promote student
async function promoteStudent() {
    const studentAddress = document.getElementById('studentAddress').value;
    const fromAddress = document.getElementById('walletAddress').value; 

    try {
        await judoBeltPromotion.methods.promoteStudent(studentAddress).send({ from: fromAddress });
        displayMessage('Promotion successful.');
    } catch (error) {
        console.error('Error promoting student:', error);
        displayError('Error promoting student.');
    }
}

// Function to get user belt level
async function getStudentBeltLevel() {
    const userAddress = document.getElementById('studentBeltAddress').value;

    try {
        const beltLevel = await judoBeltStorage.methods.getBeltLevel(userAddress).call();
        displayMessage(`The user's belt level is: ${beltLevel}`);
    } catch (error) {
        console.error('Error getting user belt level:', error);
        displayError('Error getting user belt level.');
    }
}

// Helper functions to display messages
function displayMessage(message) {
    document.getElementById('resultMessage').innerText = message;
    document.getElementById('errorMessage').innerText = '';
}

function displayError(message) {
  document.getElementById('errorMessage').innerText = message;
  document.getElementById('resultMessage').innerText = '';
}

window.addEventListener('load', initWeb3);
