
const judoSystemAddress = '0x28b1d3A759530e8a58949952c32B53D9145F537f'; // Replace with your judoSystem contract address

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
        "internalType": "uint256",
        "name": "age",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "weight",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "enum JudoSystem.AgeCategory",
        "name": "ageCategory",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "enum JudoSystem.WeightCategory",
        "name": "weightCategory",
        "type": "uint8"
      }
    ],
    "name": "DebugInfo",
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
        "name": "email",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "phoneNumber",
        "type": "string"
      }
    ],
    "name": "JudokaContactUpdated",
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
        "name": "age",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "weight",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "club",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "enum JudoSystem.AgeCategory",
        "name": "ageCategory",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "enum JudoSystem.WeightCategory",
        "name": "weightCategory",
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
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "blackBeltAdmins",
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
        "components": [
          {
            "internalType": "uint8",
            "name": "day",
            "type": "uint8"
          },
          {
            "internalType": "uint8",
            "name": "month",
            "type": "uint8"
          },
          {
            "internalType": "uint16",
            "name": "year",
            "type": "uint16"
          }
        ],
        "internalType": "struct JudoSystem.Date",
        "name": "date",
        "type": "tuple"
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
    "name": "judokasBasic",
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
        "components": [
          {
            "internalType": "uint8",
            "name": "day",
            "type": "uint8"
          },
          {
            "internalType": "uint8",
            "name": "month",
            "type": "uint8"
          },
          {
            "internalType": "uint16",
            "name": "year",
            "type": "uint16"
          }
        ],
        "internalType": "struct JudoSystem.Date",
        "name": "birthDate",
        "type": "tuple"
      },
      {
        "internalType": "enum JudoSystem.Gender",
        "name": "gender",
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
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "judokasContact",
    "outputs": [
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
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "judokasPhysical",
    "outputs": [
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
      },
      {
        "internalType": "enum JudoSystem.AgeCategory",
        "name": "ageCategory",
        "type": "uint8"
      },
      {
        "internalType": "enum JudoSystem.WeightCategory",
        "name": "weightCategory",
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
        "name": "_address",
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
        "internalType": "uint16",
        "name": "_birthYear",
        "type": "uint16"
      }
    ],
    "name": "packDateForJudoka",
    "outputs": [
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
      }
    ],
    "stateMutability": "pure",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "_month",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "_day",
        "type": "uint8"
      }
    ],
    "name": "packDateForCompetition",
    "outputs": [
      {
        "internalType": "uint16",
        "name": "",
        "type": "uint16"
      }
    ],
    "stateMutability": "pure",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_age",
        "type": "uint256"
      }
    ],
    "name": "getAgeCategory",
    "outputs": [
      {
        "internalType": "enum JudoSystem.AgeCategory",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "pure",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_weight",
        "type": "uint256"
      }
    ],
    "name": "getWeightCategory",
    "outputs": [
      {
        "internalType": "enum JudoSystem.WeightCategory",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "pure",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint8",
            "name": "day",
            "type": "uint8"
          },
          {
            "internalType": "uint8",
            "name": "month",
            "type": "uint8"
          },
          {
            "internalType": "uint16",
            "name": "year",
            "type": "uint16"
          }
        ],
        "internalType": "struct JudoSystem.Date",
        "name": "_birthDate",
        "type": "tuple"
      }
    ],
    "name": "calculateAge",
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
        "internalType": "uint32",
        "name": "_packedDate",
        "type": "uint32"
      }
    ],
    "name": "unpackDate",
    "outputs": [
      {
        "internalType": "uint16",
        "name": "year",
        "type": "uint16"
      },
      {
        "internalType": "uint8",
        "name": "month",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "day",
        "type": "uint8"
      }
    ],
    "stateMutability": "pure",
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
        "components": [
          {
            "internalType": "uint8",
            "name": "day",
            "type": "uint8"
          },
          {
            "internalType": "uint8",
            "name": "month",
            "type": "uint8"
          },
          {
            "internalType": "uint16",
            "name": "year",
            "type": "uint16"
          }
        ],
        "internalType": "struct JudoSystem.Date",
        "name": "_birthDate",
        "type": "tuple"
      },
      {
        "internalType": "enum JudoSystem.Gender",
        "name": "_gender",
        "type": "uint8"
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
    "name": "getJudokaDOB",
    "outputs": [
      {
        "internalType": "uint16",
        "name": "year",
        "type": "uint16"
      },
      {
        "internalType": "uint8",
        "name": "month",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "day",
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
    "name": "updateJudokaContactDetails",
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
                "components": [
                  {
                    "internalType": "uint8",
                    "name": "day",
                    "type": "uint8"
                  },
                  {
                    "internalType": "uint8",
                    "name": "month",
                    "type": "uint8"
                  },
                  {
                    "internalType": "uint16",
                    "name": "year",
                    "type": "uint16"
                  }
                ],
                "internalType": "struct JudoSystem.Date",
                "name": "birthDate",
                "type": "tuple"
              },
              {
                "internalType": "enum JudoSystem.Gender",
                "name": "gender",
                "type": "uint8"
              }
            ],
            "internalType": "struct JudoSystem.JudokaBasic",
            "name": "basic",
            "type": "tuple"
          },
          {
            "components": [
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
            "internalType": "struct JudoSystem.JudokaContact",
            "name": "contact",
            "type": "tuple"
          },
          {
            "components": [
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
              },
              {
                "internalType": "enum JudoSystem.AgeCategory",
                "name": "ageCategory",
                "type": "uint8"
              },
              {
                "internalType": "enum JudoSystem.WeightCategory",
                "name": "weightCategory",
                "type": "uint8"
              }
            ],
            "internalType": "struct JudoSystem.JudokaPhysical",
            "name": "physical",
            "type": "tuple"
          }
        ],
        "internalType": "struct JudoSystem.FullJudokaInfo",
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
        "internalType": "uint8",
        "name": "_day",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "_month",
        "type": "uint8"
      },
      {
        "internalType": "uint16",
        "name": "_year",
        "type": "uint16"
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

function parseDateOfBirth(dob) {
  if (dob.length !== 8 || isNaN(Number(dob))) {
      console.error('Invalid date format. Date should be in YYYYMMDD format.');
      return null;
  }

  const year = parseInt(dob.substring(0, 4), 10);
  const month = parseInt(dob.substring(4, 6), 10) - 1; // JavaScript months are zero-indexed.
  const day = parseInt(dob.substring(6, 8), 10);

  const date = new Date(year, month, day);
  return Math.floor(date.getTime() / 1000); // Convert to Unix timestamp in seconds.
}

function calculateAge(dob) { // dob is in UNIX timestamp
  var diff_ms = Date.now() - dob * 1000;
  var age_dt = new Date(diff_ms); 
  return Math.abs(age_dt.getUTCFullYear() - 1970);
}

async function registerJudoka() {
  const name = document.getElementById('judokaName').value;
  const walletAddress = document.getElementById('judokaAddress').value;
  const dob = document.getElementById('judokaDOB').value;
  const gender = document.getElementById('judokaGender').value;
  const weight = parseInt(document.getElementById('judokaWeight').value, 10);
  const club = document.getElementById('judokaClub').value;

  const year = parseInt(dob.substring(0, 4), 10);
  const month = parseInt(dob.substring(4, 6), 10);
  const day = parseInt(dob.substring(6, 8), 10);

  if (!walletAddress || isNaN(year) || isNaN(month) || isNaN(day) || isNaN(gender) || isNaN(weight)) {
      displayError('Please ensure all fields are correctly filled.');
      return;
  }

  const birthDate = { year, month, day }; // Struct for the smart contract

  try {
      const accounts = await web3.eth.getAccounts();
      await judoSystem.methods.registerJudoka(
          name, 
          walletAddress, 
          birthDate,
          parseInt(gender, 10), 
          weight, 
          club
      ).send({ from: accounts[0] })
      .on('receipt', function(receipt) {
          if (receipt.events.JudokaRegistered && receipt.events.JudokaRegistered.returnValues) {
              const judokaId = receipt.events.JudokaRegistered.returnValues.id;
              displayMessage(`Judoka registered successfully. ID: ${judokaId}`);
              document.getElementById('displayJudokaId').textContent = `Registered Judoka ID: ${judokaId}`;
          } else {
              displayError('Judoka registered, but no ID was returned.');
          }
      })
      .on('error', function(error) {
          console.error('Error registering judoka:', error);
          displayError('Error registering judoka: ' + error.message);
      });
  } catch (error) {
      console.error('Unhandled error during registration:', error);
      displayError('Unhandled error: ' + error.message);
  }
}

function calculateAgeFromStruct(birthDate) {
  const today = new Date();
  const birthDateObj = new Date(birthDate.year, birthDate.month - 1, birthDate.day); // JS months are zero-indexed
  let age = today.getFullYear() - birthDate.year;
  const m = today.getMonth() - birthDate.month + 1;
  if (m < 0 || (m === 0 && today.getDate() < birthDate.day)) {
    age--;
  }
  return age;
}


async function updateJudokaContactDetails() {
  // Retrieve judoka ID and contact info
  const judokaId = document.getElementById('judokaId').value; // Add an input field to get judoka ID
  const email = document.getElementById('judokaEmail').value;
  const phone = document.getElementById('judokaPhone').value;

  try {
    const accounts = await web3.eth.getAccounts();
    await judoSystem.methods.updateJudokaContactDetails(judokaId, email, phone).send({ from: accounts[0] });
    displayMessage('Contact details updated successfully.');
  } catch (error) {
    console.error('Error updating contact details:', error);
    displayError('Error updating contact details.');
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
      const beltLevel = await judoSystem.methods.getBeltLevel(judokaId).call(); // Fetch belt level directly
      if (judokaInfo && beltLevel != null) {
          displayJudokaProfile(judokaInfo, beltLevel);
      } else {
          displayError('No judoka information found. Check the judoka ID.');
      }
  } catch (error) {
      console.error('Error fetching judoka information:', error);
      displayError('Error fetching judoka information: ' + error.message);
  }
}

function displayJudokaProfile(judokaInfo, beltLevel) {
  const {
      basic: { id, name, walletAddress, birthDate, gender },
      contact: { email, phoneNumber },
      physical: { weight, club }
  } = judokaInfo;

  let beltLevelText = getBeltLevelText(beltLevel); // Convert belt level number to color name
  let genderText = gender == 0 ? 'Male' : 'Female';
  let age = calculateAgeFromStruct(birthDate);

  let profileHTML = `
      <p>ID: ${id}</p>
      <p>Name: ${name}</p>
      <p>Wallet Address: ${walletAddress}</p>
      <p>Belt Level: ${beltLevelText}</p> <!-- Displaying belt level as color name -->
      <p>Date of Birth: ${birthDate.day}/${birthDate.month}/${birthDate.year}</p>
      <p>Age: ${age}</p>
      <p>Gender: ${genderText}</p>
      <p>Email: ${email}</p>
      <p>Phone: ${phoneNumber}</p>
      <p>Weight: ${weight}</p>
      <p>Club: ${club}</p>
  `;

  document.getElementById('judokaProfileDisplay').innerHTML = profileHTML;
}

// Utility function to convert belt level from numeric to text description
function getBeltLevelText(beltLevel) {
  switch (beltLevel) {
      case '0': return 'White Belt';
      case '1': return 'Yellow Belt';
      case '2': return 'Orange Belt';
      case '3': return 'Green Belt';
      case '4': return 'Blue Belt';
      case '5': return 'Brown Belt';
      case '6': return 'Black Belt';
      default: return 'Unknown Belt Level';
  }
}



function convertAgeCategory(ageCategory) {
  switch(ageCategory) {
      case 0: return 'Juveniles';
      case 1: return 'Cadets';
      case 2: return 'Juniors';
      case 3: return 'Seniors';
      case 4: return 'Veterans';
      default: return 'Unknown Category';
  }
}

function convertWeightCategory(weightCategory) {
  switch(weightCategory) {
      case 0: return 'Under 60kg';
      case 1: return 'Under 66kg';
      case 2: return 'Under 73kg';
      case 3: return 'Under 81kg';
      case 4: return 'Under 90kg';
      case 5: return 'Under 100kg';
      case 6: return 'Over 100kg';
      default: return 'Unknown Category';
  }
}

// Helper functions to display messages
function displayMessage(message) {
  const messageElement = document.getElementById('message');
  messageElement.textContent = message;
}

function displayError(error) {
  const errorElement = document.getElementById('error');
  errorElement.textContent = error;
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
