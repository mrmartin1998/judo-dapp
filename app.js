// app.js

const judoBeltSystemAddress = '0x3CB6fDc33d9dE9FAbbB37CC480A823dcEdf451d9'; // Replace with your JudoBeltSystem contract address

const judoBeltSystemABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "enum JudoBeltSystem.BeltLevel",
        "name": "oldBeltLevel",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "enum JudoBeltSystem.BeltLevel",
        "name": "newBeltLevel",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "BeltLevelUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "walletAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "enum JudoBeltSystem.BeltLevel",
        "name": "beltLevel",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "dateOfBirth",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "enum JudoBeltSystem.Gender",
        "name": "gender",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "email",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "phoneNumber",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "JudokaRegistered",
    "type": "event"
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
    "name": "judokaCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
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
    "name": "judokaIds",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
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
    "name": "judokas",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "walletAddress",
        "type": "address"
      },
      {
        "internalType": "enum JudoBeltSystem.BeltLevel",
        "name": "beltLevel",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "dateOfBirth",
        "type": "uint256"
      },
      {
        "internalType": "enum JudoBeltSystem.Gender",
        "name": "gender",
        "type": "uint8"
      },
      {
        "internalType": "string",
        "name": "email",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "phoneNumber",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "_walletAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_dateOfBirth",
        "type": "uint256"
      },
      {
        "internalType": "uint8",
        "name": "_gender",
        "type": "uint8"
      },
      {
        "internalType": "string",
        "name": "_email",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_phoneNumber",
        "type": "string"
      }
    ],
    "name": "registerBlackBelt",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "_walletAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_dateOfBirth",
        "type": "uint256"
      },
      {
        "internalType": "uint8",
        "name": "_gender",
        "type": "uint8"
      },
      {
        "internalType": "string",
        "name": "_email",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_phoneNumber",
        "type": "string"
      }
    ],
    "name": "registerJudoka",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "getJudokaInfo",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "walletAddress",
            "type": "address"
          },
          {
            "internalType": "enum JudoBeltSystem.BeltLevel",
            "name": "beltLevel",
            "type": "uint8"
          },
          {
            "internalType": "uint256",
            "name": "dateOfBirth",
            "type": "uint256"
          },
          {
            "internalType": "enum JudoBeltSystem.Gender",
            "name": "gender",
            "type": "uint8"
          },
          {
            "internalType": "string",
            "name": "email",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "phoneNumber",
            "type": "string"
          }
        ],
        "internalType": "struct JudoBeltSystem.Judoka",
        "name": "",
        "type": "tuple"
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
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "getBeltLevel",
    "outputs": [
      {
        "internalType": "enum JudoBeltSystem.BeltLevel",
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
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      },
      {
        "internalType": "enum JudoBeltSystem.BeltLevel",
        "name": "_newBeltLevel",
        "type": "uint8"
      }
    ],
    "name": "promoteJudoka",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
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
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_sender",
        "type": "address"
      }
    ],
    "name": "isAuthorized",
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
        "name": "_sender",
        "type": "address"
      }
    ],
    "name": "isAdmin",
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

let judoBeltSystem;

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
    judoBeltSystem = new web3.eth.Contract(judoBeltSystemABI, judoBeltSystemAddress);
    console.log('Contract is set up and ready to interact with.');
}

// Function to register black belt
async function registerBlackBelt(name, walletAddress) {
    try {
        const accounts = await web3.eth.getAccounts();
        await judoBeltSystem.methods.registerBlackBelt(name, walletAddress).send({ from: accounts[0] });
        displayMessage('Black belt registration successful.');
    } catch (error) {
        console.error('Error registering black belt:', error);
        displayError('Error registering black belt.');
    }
}

// Function to register judoka with additional fields
async function registerJudoka() {
  const name = document.getElementById('judokaName').value;
  const walletAddress = document.getElementById('judokaAddress').value;
  const dob = document.getElementById('judokaDOB').value;
  const gender = document.getElementById('judokaGender').value;
  const email = document.getElementById('judokaEmail').value;
  const phone = document.getElementById('judokaPhone').value;

  try {
      const accounts = await web3.eth.getAccounts();
      await judoBeltSystem.methods.registerJudoka(name, walletAddress, dob, gender, email, phone).send({ from: accounts[0] });
      displayMessage('Judoka registration successful.');
  } catch (error) {
      console.error('Error registering judoka:', error);
      displayError('Error registering judoka.');
  }
}

// Function to promote judoka
async function promoteJudoka() {
  const judokaIdInput = document.getElementById('judokaId').value;
  const newBeltLevelInput = document.getElementById('newBeltLevel').value;

  // Ensure that the inputs are not empty and are numbers
  if (!judokaIdInput || !newBeltLevelInput) {
      displayError('Please ensure all fields are filled correctly.');
      return;
  }

  const judokaId = parseInt(judokaIdInput);
  const newBeltLevel = parseInt(newBeltLevelInput);

  // Check if the parsed values are valid numbers
  if (isNaN(judokaId) || isNaN(newBeltLevel)) {
      displayError('Invalid input. Please enter valid numbers.');
      return;
  }

  try {
      const accounts = await web3.eth.getAccounts();
      await judoBeltSystem.methods.promoteJudoka(judokaId, newBeltLevel).send({ from: accounts[0] });
      displayMessage('Judoka promotion successful.');
  } catch (error) {
      console.error('Error promoting judoka:', error);
      displayError('Error promoting judoka.');
  }
}

// Function to get the belt level of a judoka
async function getBeltLevel() {
  const judokaAddress = document.getElementById('judokaBeltAddress').value;
  try {
      const judokaId = await judoBeltSystem.methods.judokaIds(judokaAddress).call();
      const beltLevel = await judoBeltSystem.methods.getBeltLevel(judokaId).call();
      displayBeltLevel(beltLevel, judokaId); // Pass judokaId as a second argument
  } catch (error) {
      console.error('Error fetching belt level:', error);
      displayError('Error fetching belt level.');
  }
}

// Function to display belt level and judoka ID
function displayBeltLevel(beltLevel, judokaId) { // Add judokaId as a parameter
  let beltLevelText = '';
  switch(beltLevel) {
      case '0': beltLevelText = 'White Belt'; break;
      case '1': beltLevelText = 'Yellow Belt'; break;
      case '2': beltLevelText = 'Orange Belt'; break;
      case '3': beltLevelText = 'Green Belt'; break;
      case '4': beltLevelText = 'Blue Belt'; break;
      case '5': beltLevelText = 'Brown Belt'; break;
      case '6': beltLevelText = 'Black Belt'; break;
      default: beltLevelText = 'Unknown';
  }
  // Display both the belt level and the judoka ID
  document.getElementById('beltLevelDisplay').innerText = `Belt Level: ${beltLevelText}, Judoka ID: ${judokaId}`;
}

// Convert belt level to text
function getBeltLevelText(beltLevel) {
  switch(beltLevel) {
      case '0': return 'White Belt';
      case '1': return 'Yellow Belt';
      case '2': return 'Orange Belt';
      case '3': return 'Green Belt';
      case '4': return 'Blue Belt';
      case '5': return 'Brown Belt';
      case '6': return 'Black Belt';
      default: return 'Unknown';
  }
}

async function registerBlackBeltFromInput() {
  const name = document.getElementById('blackBeltName').value;
  const walletAddress = document.getElementById('blackBeltAddress').value;
  const dob = document.getElementById('blackBeltDOB').value;
  const gender = document.getElementById('blackBeltGender').value;
  const email = document.getElementById('blackBeltEmail').value;
  const phone = document.getElementById('blackBeltPhone').value;

  try {
      const accounts = await web3.eth.getAccounts();
      await judoBeltSystem.methods.registerBlackBelt(name, walletAddress, dob, gender, email, phone).send({ from: accounts[0] });
      displayMessage('Black belt registration successful.');
  } catch (error) {
      console.error('Error registering black belt:', error);
      displayError('Error registering black belt.');
  }
}

// Function to get a judoka's profile information
async function getJudokaProfile() {
  const judokaIdInput = document.getElementById('judokaId').value;

  if (!judokaIdInput) {
      displayError('Please enter a valid judoka ID.');
      return;
  }

  const judokaId = parseInt(judokaIdInput);
  if (isNaN(judokaId)) {
      displayError('Invalid input. Please enter a valid judoka ID.');
      return;
  }

  try {
      const judokaInfo = await judoBeltSystem.methods.getJudokaInfo(judokaId).call();
      displayJudokaProfile(judokaInfo);
  } catch (error) {
      console.error('Error fetching judoka information:', error);
      displayError('Error fetching judoka information.');
  }
}

// Function to display a judoka's profile information
function displayJudokaProfile(judokaInfo) {
  // judokaInfo will be an array if it comes from a smart contract call
  const [id, name, walletAddress, beltLevel, dateOfBirth, gender, email, phoneNumber] = judokaInfo;

  let genderText = gender === '0' ? 'Male' : 'Female';
  let beltLevelText = getBeltLevelText(beltLevel);

  // Format date of birth correctly
  let dob = new Date(dateOfBirth * 1000).toLocaleDateString();

  // Update HTML elements to show the judoka's profile
  document.getElementById('judokaProfileDisplay').innerHTML = `
    <p>ID: ${id}</p>
    <p>Name: ${name}</p>
    <p>Wallet Address: ${walletAddress}</p>
    <p>Belt Level: ${beltLevelText}</p>
    <p>Date of Birth: ${dob}</p>
    <p>Gender: ${genderText}</p>
    <p>Email: ${email}</p>
    <p>Phone: ${phoneNumber}</p>
  `;
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
