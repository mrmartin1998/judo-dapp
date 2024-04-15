// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract JudoSystem {
    enum BeltLevel { White, Yellow, Orange, Green, Blue, Brown, Black }
    enum Gender { Male, Female }
    enum AgeCategory { Juveniles, Cadets, Juniors, Seniors, Veterans }
    enum WeightCategory { Under60, Under66, Under73, Under81, Under90, Under100, Over100 }

    struct JudokaBasic {
        uint256 id;
        string name;
        address walletAddress;
        BeltLevel beltLevel;
        uint32 dateOfBirth;
        Gender gender;
    }

    struct JudokaContact {
        string email;
        string phoneNumber;
    }

    struct JudokaPhysical {
        uint256 age;
        uint256 weight;
        string club;
        AgeCategory ageCategory;
        WeightCategory weightCategory;
    }

    struct FullJudokaInfo {
        JudokaBasic basic;
        JudokaContact contact;
        JudokaPhysical physical;
    }

    struct CompetitionResult {
        address firstPlace;
        address secondPlace;
        address thirdPlace;
        address fourthPlace;
    }

    struct Competition {
        uint256 id;
        string name;
        uint256 date;
        address[] participants;
        bool completed;
        CompetitionResult results;
    }

    struct BeltLevelChange {
        BeltLevel oldBeltLevel;
        BeltLevel newBeltLevel;
        uint256 timestamp;
    }

    uint256 public judokaCount;
    uint256 public competitionCount;
    mapping(address => uint256) public judokaIds;
    mapping(uint256 => uint256) public judokaPoints;
    mapping(uint256 => Competition) public competitions;
    mapping(address => bool) public blackBeltAdmins;
    mapping(uint256 => JudokaBasic) public judokasBasic;
    mapping(uint256 => JudokaContact) public judokasContact;
    mapping(uint256 => JudokaPhysical) public judokasPhysical;

    address public admin;

    event JudokaRegistered(uint256 indexed id, string name, address walletAddress, BeltLevel beltLevel, uint256 dateOfBirth, Gender gender, string email, string phoneNumber, uint256 age, uint256 weight, string club, AgeCategory ageCategory, WeightCategory weightCategory, uint256 timestamp);
    event BeltLevelUpdated(uint256 indexed id, BeltLevel oldBeltLevel, BeltLevel newBeltLevel, uint256 timestamp);
    event CompetitionCreated(uint256 indexed id, string name, uint256 date);
    event ParticipantAdded(uint256 indexed competitionId, address participant);
    event CompetitionResultRecorded(uint256 indexed competitionId, address firstPlace, address secondPlace, address thirdPlace, address fourthPlace);
    event JudokaContactUpdated(uint256 indexed id, string email, string phoneNumber);
    
    constructor() {
        admin = msg.sender;
        blackBeltAdmins[msg.sender] = true;
    }

    modifier onlyAdmin() {
        require(isAdmin(msg.sender), "Only admin can perform this action");
        _;
    }

    function isAdmin(address _address) public view returns (bool) {
    return _address == admin || blackBeltAdmins[_address];
    }

    // Utility functions for date packing and unpacking
    function packDate(uint16 year, uint8 month, uint8 day) public pure returns (uint32) {
        return (uint32(year) << 16) | (uint32(month) << 8) | uint32(day);
    }

    function unpackDate(uint32 packedDate) public pure returns (uint16 year, uint8 month, uint8 day) {
        year = uint16(packedDate / 10000);
        month = uint8((packedDate / 100) % 100);
        day = uint8(packedDate % 100);
    }


    function getAgeCategory(uint256 _age) public pure returns (AgeCategory) {
        if (_age >= 13 && _age <= 14) {
            return AgeCategory.Juveniles;
        } else if (_age >= 15 && _age <= 17) {
            return AgeCategory.Cadets;
        } else if (_age >= 18 && _age <= 20) {
            return AgeCategory.Juniors;
        } else if (_age >= 21 && _age <= 30) {
            return AgeCategory.Seniors;
        } else {
            return AgeCategory.Veterans;
        }
    }

    function getWeightCategory(uint256 _weight) public pure returns (WeightCategory) {
        if (_weight < 60) {
            return WeightCategory.Under60;
        } else if (_weight < 66) {
            return WeightCategory.Under66;
        } else if (_weight < 73) {
            return WeightCategory.Under73;
        } else if (_weight < 81) {
            return WeightCategory.Under81;
        } else if (_weight < 90) {
            return WeightCategory.Under90;
        } else if (_weight < 100) {
            return WeightCategory.Under100;
        } else {
            return WeightCategory.Over100;
        }
    }

    function calculateAge(uint32 _dateOfBirth) public view returns (uint256) {
        (uint16 year, uint8 month, uint8 day) = unpackDate(_dateOfBirth);
        uint256 dobInSeconds = uint256(year) * 365 days + uint256(month) * 30 days + uint256(day) * 1 days;
        if (dobInSeconds > block.timestamp) {
            return 0;
        }
        return (block.timestamp - dobInSeconds) / 365 days;
    }

function registerJudoka(
    string memory _name, 
    address _walletAddress, 
    uint32 _dateOfBirth, // Ensure this is uint32 as per your date packing
    Gender _gender,
    uint256 _weight,
    string memory _club
) public {
    require(_walletAddress != address(0), "Invalid wallet address");
    require(judokaIds[_walletAddress] == 0, "Judoka already registered");

    uint256 age = calculateAge(_dateOfBirth);
    AgeCategory ageCategory = getAgeCategory(age);
    WeightCategory weightCategory = getWeightCategory(_weight);

    judokaCount++;

    judokasBasic[judokaCount] = JudokaBasic({
        id: judokaCount,
        name: _name,
        walletAddress: _walletAddress,
        beltLevel: BeltLevel.White,
        dateOfBirth: _dateOfBirth, // Assuming this is correctly formatted as uint32
        gender: _gender
    });

    judokasContact[judokaCount] = JudokaContact({
        email: '',
        phoneNumber: ''
    });

    judokasPhysical[judokaCount] = JudokaPhysical({
        age: age,
        weight: _weight,
        club: _club,
        ageCategory: ageCategory,
        weightCategory: weightCategory
    });

    judokaIds[_walletAddress] = judokaCount;

    emit JudokaRegistered(
        judokaCount, 
        _name, 
        _walletAddress, 
        BeltLevel.White, 
        _dateOfBirth, 
        _gender, 
        '',  // email placeholder
        '',  // phone placeholder
        age, 
        _weight, 
        _club, 
        ageCategory, 
        weightCategory,
        block.timestamp  // Missing timestamp added
    );
}


function getJudokaDOB(uint256 _id) public view returns (uint16 year, uint8 month, uint8 day) {
        (year, month, day) = unpackDate(judokasBasic[_id].dateOfBirth);
    }

function updateJudokaContactDetails(
    uint256 _id,
    string memory _email,
    string memory _phoneNumber
) public {
    require(_id > 0 && _id <= judokaCount, "Judoka does not exist");
    require(msg.sender == judokasBasic[_id].walletAddress || isAdmin(msg.sender), "Not authorized");

    judokasContact[_id] = JudokaContact({
        email: _email,
        phoneNumber: _phoneNumber
    });

    emit JudokaContactUpdated(_id, _email, _phoneNumber);
}




    function getJudokaInfo(uint256 _id) public view returns (FullJudokaInfo memory) {
        require(_id > 0 && _id <= judokaCount, "Judoka does not exist.");
        return FullJudokaInfo({
            basic: judokasBasic[_id],
            contact: judokasContact[_id],
            physical: judokasPhysical[_id]
        });
    }

    function getBeltLevel(uint256 _id) public view returns (BeltLevel) {
        require(_id > 0 && _id <= judokaCount, "Judoka does not exist.");
        return judokasBasic[_id].beltLevel;
    }

    function promoteJudoka(uint256 _id, BeltLevel _newBeltLevel) public onlyAdmin {
        require(_id > 0 && _id <= judokaCount, "Judoka does not exist.");
        require(_newBeltLevel > judokasBasic[_id].beltLevel, "New level must be higher");

        BeltLevel oldBeltLevel = judokasBasic[_id].beltLevel;
        judokasBasic[_id].beltLevel = _newBeltLevel;

        if (_newBeltLevel == BeltLevel.Black) {
            blackBeltAdmins[judokasBasic[_id].walletAddress] = true;
        }

        emit BeltLevelUpdated(_id, oldBeltLevel, _newBeltLevel, block.timestamp);
    }

    function isBlackBelt(address _address) public view returns (bool) {
        return judokasBasic[judokaIds[_address]].beltLevel == BeltLevel.Black;
    }

    function isAuthorized(uint256 _id, address _sender) public view returns (bool) {
        return _sender == judokasBasic[_id].walletAddress || _sender == admin;
    }

    function updateJudokaPoints(uint256 _id, uint256 _points) public onlyAdmin {
        require(_id > 0 && _id <= judokaCount, "Invalid Judoka ID");
        judokaPoints[_id] += _points;
    }

    function createCompetition(
        string memory _name, 
        uint256 _date
    ) public onlyAdmin {
        CompetitionResult memory defaultResults = CompetitionResult({
            firstPlace: address(0),
            secondPlace: address(0),
            thirdPlace: address(0),
            fourthPlace: address(0)
        });

        competitionCount++;
        competitions[competitionCount] = Competition({
            id: competitionCount,
            name: _name,
            date: _date,
            participants: new address[](0)  ,
            completed: false,
            results: defaultResults
        });

        emit CompetitionCreated(competitionCount, _name, _date);
    }

    function addParticipant(uint256 _competitionId, address _participant) public onlyAdmin {
        require(!competitions[_competitionId].completed, "Competition already completed");
        competitions[_competitionId].participants.push(_participant);
        emit ParticipantAdded(_competitionId, _participant);
    }

    function recordCompetitionResult(
        uint256 _competitionId, 
        address _firstPlace, 
        address _secondPlace, 
        address _thirdPlace, 
        address _fourthPlace,
        uint256 _firstPlacePoints,
        uint256 _secondPlacePoints,
        uint256 _thirdPlacePoints,
        uint256 _fourthPlacePoints
    ) public onlyAdmin {
        require(!competitions[_competitionId].completed, "Competition already completed");
        require(competitions[_competitionId].participants.length > 0, "No participants in competition");

        require(judokaIds[_firstPlace] != 0, "First place winner not registered");
        require(judokaIds[_secondPlace] != 0, "Second place winner not registered");
        require(judokaIds[_thirdPlace] != 0, "Third place winner not registered");
        require(judokaIds[_fourthPlace] != 0, "Fourth place winner not registered");

        competitions[_competitionId].completed = true;
        competitions[_competitionId].results = CompetitionResult({
            firstPlace: _firstPlace,
            secondPlace: _secondPlace,
            thirdPlace: _thirdPlace,
            fourthPlace: _fourthPlace
        });

        if (_firstPlacePoints > 0) {
            updateJudokaPoints(judokaIds[_firstPlace], _firstPlacePoints);
        }
        if (_secondPlacePoints > 0) {
            updateJudokaPoints(judokaIds[_secondPlace], _secondPlacePoints);
        }
        if (_thirdPlacePoints > 0) {
            updateJudokaPoints(judokaIds[_thirdPlace], _thirdPlacePoints);
        }
        if (_fourthPlacePoints > 0) {
            updateJudokaPoints(judokaIds[_fourthPlace], _fourthPlacePoints);
        }

        emit CompetitionResultRecorded(_competitionId, _firstPlace, _secondPlace, _thirdPlace, _fourthPlace);
    }
}
