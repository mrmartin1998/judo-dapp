// Make sure to replace 'CONTRACT_ADDRESS' and 'CONTRACT_ABI' with the actual deployed contract address and ABI.
const JudoBeltSystemAddress = '0x6C5C1CE77CdD074FE1d23DD0C7d74783BFB2EfAc';
const JudoBeltSystemABI = [
  {
    "inputs": [
      {
        "internalType": "address[]",
        "name": "senseiWallets",
        "type": "address[]"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "wallet",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "enum JudoBeltSystem.BeltLevel",
        "name": "belt",
        "type": "uint8"
      }
    ],
    "name": "UserPromoted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "wallet",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "enum JudoBeltSystem.BeltLevel",
        "name": "belt",
        "type": "uint8"
      }
    ],
    "name": "UserRegistered",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "users",
    "outputs": [
      {
        "internalType": "enum JudoBeltSystem.BeltLevel",
        "name": "belt",
        "type": "uint8"
      },
      {
        "internalType": "bool",
        "name": "isSensei",
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
        "internalType": "enum JudoBeltSystem.BeltLevel",
        "name": "initialBelt",
        "type": "uint8"
      }
    ],
    "name": "registerUser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "studentWallet",
        "type": "address"
      },
      {
        "internalType": "enum JudoBeltSystem.BeltLevel",
        "name": "newBelt",
        "type": "uint8"
      }
    ],
    "name": "promoteStudent",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "studentWallet",
        "type": "address"
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
  }
];

// Enum to represent belt levels
const BeltLevel = {
    0: "White Belt",
    1: "Yellow Belt",
    2: "Orange Belt",
    3: "Green Belt",
    4: "Blue Belt",
    5: "Brown Belt",
    6: "Black Belt",
  };
  
  // Connect to the Ethereum network via MetaMask
  async function connectToEthereum() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log('Connected to Ethereum.');
      } catch (error) {
        console.error('Error connecting to Ethereum:', error);
      }
    } else {
      console.error('Ethereum not available in your browser. Please consider using MetaMask.');
    }
  }
  
  // Register a new user with their selected belt level
  async function registerUser() {
    const walletAddress = document.getElementById('walletAddress').value;
    const beltLevel = parseInt(document.getElementById('beltLevel').value);
    if (!walletAddress || isNaN(beltLevel)) {
      console.error('Please provide a valid wallet address and select a belt level.');
      return;
    }
  
    try {
      const contract = new web3.eth.Contract(JudoBeltSystemABI, JudoBeltSystemAddress);
      await contract.methods.registerUser(beltLevel).send({ from: walletAddress });
      console.log('User registered successfully.');
      alert('User registered successfully. Wallet Address: ' + walletAddress + ', Belt Level: ' + BeltLevel[beltLevel]);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  }
  
  // Promote a student to the selected new belt level
  async function promoteStudent() {
    const studentAddress = document.getElementById('studentAddress').value;
    const newBeltLevel = parseInt(document.getElementById('newBeltLevel').value);
    const walletAddress = window.ethereum.selectedAddress;
  
    if (!studentAddress || isNaN(newBeltLevel) || !walletAddress) {
      console.error('Please provide a valid student wallet address and select a new belt level.');
      return;
    }
  
    try {
      const contract = new web3.eth.Contract(JudoBeltSystemABI, JudoBeltSystemAddress);
      const studentBeltLevelBefore = await contract.methods.getBeltLevel(studentAddress).call();
      console.log('Student Belt Level (Before Promotion):', studentBeltLevelBefore);
  
      // Register the student if not already registered
      if (studentBeltLevelBefore == 0) {
        await contract.methods.registerUser(newBeltLevel).send({ from: studentAddress });
        console.log('Student registered successfully.');
        // Wait for the registration transaction to be confirmed
        await contract.methods.UserRegistered().on('data', () => {
          console.log('Registration transaction confirmed.');
        });
      }
  
      // Now, the student should be registered. Proceed with promotion.
      const studentBeltLevelAfter = await contract.methods.getBeltLevel(studentAddress).call();
      console.log('Student Belt Level (After Registration):', studentBeltLevelAfter);
  
      if (!isSensei(walletAddress)) {
        console.error('Only a sensei can promote a student.');
        return;
      }
  
      // Check if the new belt level is higher than the current one
      if (studentBeltLevelAfter >= newBeltLevel) {
        console.error('Please select a higher belt level for promotion.');
        return;
      }
  
      // Perform the student promotion
      const transaction = await contract.methods.promoteStudent(studentAddress, newBeltLevel).send({ from: walletAddress });
      console.log('Transaction Hash:', transaction.transactionHash);
  
      // Wait for the promotion transaction to be confirmed
      await contract.methods.UserPromoted().on('data', () => {
        console.log('Promotion transaction confirmed.');
      });
  
      console.log('Student promoted successfully.');
      alert('Student promoted successfully. New Belt Level: ' + BeltLevel[newBeltLevel]);
    } catch (error) {
      console.error('Error promoting student:', error);
    }
  }
  
  
  // Helper function to check if the current user is a sensei (black belt)
function isSensei(walletAddress) {
    const senseiAddresses = [
      '0x6bD300EcFc394Dd230f81B5D4e0D003416dcBAdF', // Replace with actual sensei address 1
      '0x01555EEE2732C708BB8D628E44366Ff0Bb19CF33', // Replace with actual sensei address 2
    ];
    return senseiAddresses.includes(walletAddress.toLowerCase());
  }
  
  
  // View a student's current belt level
// View a student's current belt level
async function getStudentBeltLevel() {
    const studentAddress = document.getElementById('studentBeltAddress').value;
    if (!studentAddress) {
      console.error('Please provide a valid student wallet address.');
      return;
    }
  
    try {
      const contract = new web3.eth.Contract(JudoBeltSystemABI, JudoBeltSystemAddress);
      const studentBeltLevel = await contract.methods.getBeltLevel(studentAddress).call();
      
      if (studentBeltLevel == 0) {
        console.log('Student is not registered.');
        alert('Student is not registered.');
      } else {
        console.log('Student Belt Level:', studentBeltLevel);
        alert('Student Belt Level: ' + BeltLevel[studentBeltLevel]);
      }
    } catch (error) {
      console.error('Error getting student belt level:', error);
    }
  }
  
  
  // Load Web3 and connect to Ethereum on page load
  window.addEventListener('load', async () => {
    if (typeof window.ethereum !== 'undefined') {
      window.web3 = new Web3(window.ethereum);
      console.log('Web3 loaded.');
  
      // Check if the user is logged in to MetaMask
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length === 0) {
        console.warn('No accounts found. Please log in to MetaMask.');
      } else {
        console.log('Connected account:', accounts[0]);
      }
    } else {
      console.error('Ethereum not available in your browser. Please consider using MetaMask.');
    }
  });