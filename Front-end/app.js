// app.js

const judoSystemAddress = '0x61940d2fc34bf555417B3f146a22a238A51e357A'; // Replace with your judoSystem contract address

const judoSystemABI = [
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
        "internalType": "enum JudoSystem.BeltLevel",
        "name": "oldBeltLevel",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "enum JudoSystem.BeltLevel",
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
        "internalType": "uint256",
        "name": "date",
        "type": "uint256"
      }
    ],
    "name": "CompetitionCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "competitionId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "firstPlace",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "secondPlace",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "thirdPlace",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "fourthPlace",
        "type": "address"
      }
    ],
    "name": "CompetitionResultRecorded",
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
        "internalType": "enum JudoSystem.BeltLevel",
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
        "internalType": "enum JudoSystem.Gender",
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
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "competitionId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "participant",
        "type": "address"
      }
    ],
    "name": "ParticipantAdded",
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
    "name": "competitionCount",
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
    "name": "competitions",
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
        "internalType": "uint256",
        "name": "date",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "completed",
        "type": "bool"
      },
      {
        "components": [
          {
            "internalType": "address",
            "name": "firstPlace",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "secondPlace",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "thirdPlace",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "fourthPlace",
            "type": "address"
          }
        ],
        "internalType": "struct JudoSystem.CompetitionResult",
        "name": "results",
        "type": "tuple"
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
    "name": "judokaPoints",
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
        "internalType": "enum JudoSystem.BeltLevel",
        "name": "beltLevel",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "dateOfBirth",
        "type": "uint256"
      },
      {
        "internalType": "enum JudoSystem.Gender",
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
      },
      {
        "internalType": "uint256",
        "name": "age",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "weight",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "club",
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
      },
      {
        "internalType": "uint256",
        "name": "_age",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_weight",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_club",
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
      },
      {
        "internalType": "uint256",
        "name": "_age",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_weight",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_club",
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
            "internalType": "enum JudoSystem.BeltLevel",
            "name": "beltLevel",
            "type": "uint8"
          },
          {
            "internalType": "uint256",
            "name": "dateOfBirth",
            "type": "uint256"
          },
          {
            "internalType": "enum JudoSystem.Gender",
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
          },
          {
            "internalType": "uint256",
            "name": "age",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "weight",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "club",
            "type": "string"
          }
        ],
        "internalType": "struct JudoSystem.Judoka",
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
        "internalType": "enum JudoSystem.BeltLevel",
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
        "internalType": "enum JudoSystem.BeltLevel",
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
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_points",
        "type": "uint256"
      }
    ],
    "name": "updateJudokaPoints",
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
        "internalType": "uint256",
        "name": "_date",
        "type": "uint256"
      }
    ],
    "name": "createCompetition",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_competitionId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_participant",
        "type": "address"
      }
    ],
    "name": "addParticipant",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_competitionId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_firstPlace",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_secondPlace",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_thirdPlace",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_fourthPlace",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_firstPlacePoints",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_secondPlacePoints",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_thirdPlacePoints",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_fourthPlacePoints",
        "type": "uint256"
      }
    ],
    "name": "recordCompetitionResult",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

let judoSystem;

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
  judoSystem = new web3.eth.Contract(judoSystemABI, judoSystemAddress);
  console.log('Contract is set up and ready to interact with.');
}

// Function to register black belt
async function registerBlackBeltFromInput() {
  const name = document.getElementById('blackBeltName').value;
  const walletAddress = document.getElementById('blackBeltAddress').value;
  const dob = document.getElementById('blackBeltDOB').value;
  const gender = document.getElementById('blackBeltGender').value;
  const email = document.getElementById('blackBeltEmail').value;
  const phone = document.getElementById('blackBeltPhone').value;
  const age = parseInt(document.getElementById('blackBeltAge').value);
  const weight = parseInt(document.getElementById('blackBeltWeight').value);
  const club = document.getElementById('blackBeltClub').value;

  // Add console.log here to inspect the values
  console.log(name, walletAddress, dob, gender, email, phone, age, weight, club);

  try {
      const accounts = await web3.eth.getAccounts();
      await judoSystem.methods.registerBlackBelt(
          name, 
          walletAddress, 
          dob, 
          gender, 
          email, 
          phone,
          age, 
          weight, 
          club
      ).send({ from: accounts[0] });
      displayMessage('Black belt registration successful.');
  } catch (error) {
      console.error('Error registering black belt:', error);
      displayError('Error registering black belt: ' + error.message);
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
  const age = parseInt(document.getElementById('judokaAge').value);
  const weight = parseInt(document.getElementById('judokaWeight').value);
  const club = document.getElementById('judokaClub').value;  

  try {
      const accounts = await web3.eth.getAccounts();
      await judoSystem.methods.registerJudoka(name, walletAddress, dob, gender, email, phone, age, weight, club).send({ from: accounts[0] });
      displayMessage('Judoka registration successful.');
  } catch (error) {
      console.error('Error registering judoka:', error);
      displayError('Error registering judoka.');
  }
}

// Function to convert date string to Unix timestamp
function parseDate(dateStr) {
  const year = dateStr.substring(0, 4);
  const month = dateStr.substring(4, 6);
  const day = dateStr.substring(6, 8);
  return new Date(year, month - 1, day).toLocaleDateString(); // Month is 0-indexed
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
      await judoSystem.methods.promoteJudoka(judokaId, newBeltLevel).send({ from: accounts[0] });
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
      const judokaId = await judoSystem.methods.judokaIds(judokaAddress).call();
      const beltLevel = await judoSystem.methods.getBeltLevel(judokaId).call();
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
      const judokaInfo = await judoSystem.methods.getJudokaInfo(judokaId).call();
      displayJudokaProfile(judokaInfo);
  } catch (error) {
      console.error('Error fetching judoka information:', error);
      displayError('Error fetching judoka information.');
  }
}

// Function to display a judoka's profile information
function displayJudokaProfile(judokaInfo) {
  const [id, name, walletAddress, beltLevel, dateOfBirth, gender, email, phoneNumber, age, weight, club] = judokaInfo;

  let genderText = gender === '0' ? 'Male' : 'Female';
  let beltLevelText = getBeltLevelText(beltLevel);

  let dob = parseDate(dateOfBirth.toString()); // Convert and parse DOB

  let profileHTML = `
    <p>ID: ${id}</p>
    <p>Name: ${name}</p>
    <p>Wallet Address: ${walletAddress}</p>
    <p>Belt Level: ${beltLevelText}</p>
    <p>Date of Birth: ${dob}</p>
    <p>Gender: ${genderText}</p>
    <p>Email: ${email}</p>
    <p>Phone: ${phoneNumber}</p>
    <p>Age: ${age}</p>
    <p>Weight: ${weight}</p>
    <p>Club: ${club}</p>
  `;

  document.getElementById('judokaProfileDisplay').innerHTML = profileHTML;
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

// Function to load the leaderboard
async function loadLeaderboard() {
  try {
      const leaderboardDisplay = document.getElementById('leaderboardDisplay');
      if (!leaderboardDisplay) return; // exit if not found

      const judokaCount = await judoSystem.methods.judokaCount().call(); // Fetch the judoka count
      let judokas = [];

      for (let i = 1; i <= judokaCount; i++) {
          const judoka = await judoSystem.methods.judokas(i).call();
          const points = await judoSystem.methods.judokaPoints(judoka.id).call();
          judokas.push({ 
              id: judoka.id, 
              name: judoka.name, 
              points: points,
              beltLevel: judoka.beltLevel // keeping belt level info for display
          });
      }

      // Sort judokas by points (descending)
      judokas.sort((a, b) => b.points - a.points);

      displayLeaderboard(judokas);
  } catch (error) {
      console.error('Error loading leaderboard:', error);
      displayError('Error loading leaderboard.');
  }
}

// Function to display the leaderboard
function displayLeaderboard(judokas) {
  const leaderboardDisplay = document.getElementById('leaderboardDisplay');
  leaderboardDisplay.innerHTML = '';

  judokas.forEach(judoka => {
      const beltLevelText = getBeltLevelText(judoka.beltLevel);
      leaderboardDisplay.innerHTML += `<p>${judoka.name} - ${beltLevelText} (ID: ${judoka.id}) - Points: ${judoka.points}</p>`;
  });
}

// Call this function when the leaderBoards.html page loads
window.addEventListener('load', async () => {
  await initWeb3();
  await loadLeaderboard();
});

// Function to update a judoka's points
async function updateJudokaPoints() {
  const judokaIdInput = document.getElementById('judokaId').value;
  const pointsInput = document.getElementById('judokaPoints').value;

  if (!judokaIdInput || !pointsInput) {
      displayError('Please enter a valid judoka ID and points.');
      return;
  }

  const judokaId = parseInt(judokaIdInput);
  const points = parseInt(pointsInput);

  if (isNaN(judokaId) || isNaN(points)) {
      displayError('Invalid input. Please enter valid numbers.');
      return;
  }

  try {
      const accounts = await web3.eth.getAccounts();
      await judoSystem.methods.updateJudokaPoints(judokaId, points).send({ from: accounts[0] });
      displayMessage(`Judoka points updated successfully. ID: ${judokaId}, Points: ${points}`);
  } catch (error) {
      console.error('Error updating judoka points:', error);
      displayError('Error updating judoka points.');
  }
}

async function createCompetition() {
  const name = document.getElementById('competitionName').value;
  const date = document.getElementById('competitionDate').value;

  // Parse the date input to a timestamp
 //const date = new Date(dateInput).getTime() / 1000; // Convert to seconds

  try {
      const accounts = await web3.eth.getAccounts();
      await judoSystem.methods.createCompetition(name, date).send({ from: accounts[0] });
      displayMessage('Competition created successfully.');
  } catch (error) {
      console.error('Error creating competition:', error);
      displayError('Error creating competition: ' + error.message);
  }
}

// Function to add a participant to a competition
async function addParticipant() {
  const competitionId = document.getElementById('competitionId').value;
  const participantAddress = document.getElementById('participantAddress').value;

  try {
      const accounts = await web3.eth.getAccounts();
      await judoSystem.methods.addParticipant(competitionId, participantAddress).send({ from: accounts[0] });
      displayMessage('Participant added successfully.');
  } catch (error) {
      console.error('Error adding participant:', error);
      displayError('Error adding participant.');
  }
}

// Function to record competition result with all places
async function recordCompetitionResult() {
  const competitionId = document.getElementById('resultCompetitionId').value;
  const firstPlaceAddress = document.getElementById('firstPlaceAddress').value;
  const firstPlacePoints = document.getElementById('firstPlacePoints').value;
  const secondPlaceAddress = document.getElementById('secondPlaceAddress').value;
  const secondPlacePoints = document.getElementById('secondPlacePoints').value;
  const thirdPlaceAddress = document.getElementById('thirdPlaceAddress').value;
  const thirdPlacePoints = document.getElementById('thirdPlacePoints').value;
  const fourthPlaceAddress = document.getElementById('fourthPlaceAddress').value;
  const fourthPlacePoints = document.getElementById('fourthPlacePoints').value;

  try {
      const accounts = await web3.eth.getAccounts();
      // Assuming the contract method to record results has been updated to accept multiple participants and points
      await judoSystem.methods.recordCompetitionResult(
          competitionId, 
          firstPlaceAddress, 
          secondPlaceAddress, 
          thirdPlaceAddress, 
          fourthPlaceAddress,
          firstPlacePoints, 
          secondPlacePoints, 
          thirdPlacePoints, 
          fourthPlacePoints
      ).send({ from: accounts[0] });
      displayMessage('Competition result recorded successfully.');
  } catch (error) {
      console.error('Error recording competition result:', error);
      displayError('Error recording competition result.');
  }
}

function displayMessage(message) {
  const resultMessageEl = document.getElementById('resultMessage');
  const errorMessageEl = document.getElementById('errorMessage');
  if (resultMessageEl) resultMessageEl.innerText = message;
  if (errorMessageEl) errorMessageEl.innerText = '';
}

function displayError(message) {
  const errorMessageEl = document.getElementById('errorMessage');
  const resultMessageEl = document.getElementById('resultMessage');
  if (errorMessageEl) errorMessageEl.innerText = message;
  if (resultMessageEl) resultMessageEl.innerText = '';
}

// Function to load active competitions
async function loadActiveCompetitions() {
  try {
      const activeCompetitionsDisplay = document.getElementById('activeCompetitionsDisplay');
      if (!activeCompetitionsDisplay) return;

      const competitionCount = await judoSystem.methods.competitionCount().call();
      let activeCompetitions = [];

      for (let i = 1; i <= competitionCount; i++) {
          const competition = await judoSystem.methods.competitions(i).call();
          if (!competition.completed) {
              activeCompetitions.push({
                  id: competition.id,
                  name: competition.name,
                  date: competition.date // You may format the date as needed
              });
          }
      }

      displayActiveCompetitions(activeCompetitions);
  } catch (error) {
      console.error('Error loading active competitions:', error);
      displayError('Error loading active competitions.');
  }
}

// Function to display active competitions
function displayActiveCompetitions(competitions) {
  const activeCompetitionsDisplay = document.getElementById('activeCompetitionsDisplay');
  activeCompetitionsDisplay.innerHTML = '';

  competitions.forEach(competition => {
      // Format the date correctly
      let compDate = new Date(competition.date * 1000).toLocaleDateString();
      activeCompetitionsDisplay.innerHTML += `<p>${competition.name} - Date: ${compDate} (ID: ${competition.id})</p>`;
  });
}

// Call this function when the competitions.html page loads
window.addEventListener('load', async () => {
  await initWeb3();
  await loadLeaderboard();
  await loadActiveCompetitions(); // Load active competitions
});

window.addEventListener('load', initWeb3);
