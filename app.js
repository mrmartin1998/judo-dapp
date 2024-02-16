// app.js

const judoBeltSystemAddress = '0xBDF6E2f379ba491B1B3deC1B2342bea3B8139b86'; // Replace with your JudoBeltSystem contract address

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

// Function to register judoka
async function registerJudoka() {
    const name = document.getElementById('judokaName').value;
    const walletAddress = document.getElementById('judokaAddress').value;

    try {
        const accounts = await web3.eth.getAccounts();
        await judoBeltSystem.methods.registerJudoka(name, walletAddress).send({ from: accounts[0] });
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

function registerBlackBeltFromInput() {
    const name = document.getElementById('blackBeltName').value;
    const walletAddress = document.getElementById('blackBeltAddress').value;
    registerBlackBelt(name, walletAddress);
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
