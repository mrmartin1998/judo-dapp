// app.js

const judoBeltStorageAddress = '0x329672B5Ee90e3Bb22388E13b0b487A4705D3255';
const judoUserRegistrationAddress = '0xC361A101CC3E4f32F2701CFec6b95a2D29099baa';
const judoBeltPromotionAddress = '0x2408236548c7BCdC09DAE405346c637e7064a6a2';

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
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "blackBelts",
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
          "name": "blackBeltAddress",
          "type": "address"
        }
      ],
      "name": "addBlackBelt",
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
          "name": "judoka",
          "type": "address"
        }
      ],
      "name": "isBlackBelt",
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
  ]; 


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
  const userAddress = document.getElementById('walletAddress').value; // Address of the user being registered

  try {
      await judoUserRegistration.methods.registerUser(userAddress).send({ from: userAddress });
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
