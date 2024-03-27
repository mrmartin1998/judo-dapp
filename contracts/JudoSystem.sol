// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract JudoSystem {
    enum BeltLevel { White, Yellow, Orange, Green, Blue, Brown, Black }
    enum Gender { Male, Female }

    struct Judoka {
        uint256 id;
        string name;
        address walletAddress;
        BeltLevel beltLevel;
        uint256 dateOfBirth;
        Gender gender;
        string email;
        string phoneNumber;
    }

    struct Competition {
        uint256 id;
        string name;
        uint256 date;
        address[] participants;
        bool completed;
        address winner;
    }

    struct BeltLevelChange {
        BeltLevel oldBeltLevel;
        BeltLevel newBeltLevel;
        uint256 timestamp;
    }

    uint256 public judokaCount;
    uint256 public competitionCount;
    mapping(uint256 => Judoka) public judokas;
    mapping(address => uint256) public judokaIds;
    mapping(uint256 => uint256) public judokaPoints;
    mapping(uint256 => Competition) public competitions;
    address public admin;

    event JudokaRegistered(uint256 indexed id, string name, address walletAddress, BeltLevel beltLevel, uint256 dateOfBirth, Gender gender, string email, string phoneNumber, uint256 timestamp);
    event BeltLevelUpdated(uint256 indexed id, BeltLevel oldBeltLevel, BeltLevel newBeltLevel, uint256 timestamp);
    event CompetitionCreated(uint256 indexed id, string name, uint256 date);
    event ParticipantAdded(uint256 indexed competitionId, address participant);
    event CompetitionResultRecorded(uint256 indexed competitionId, address winner);

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    // Functions from JudoBeltSystem
function registerBlackBelt(
    string memory _name, 
    address _walletAddress, 
    uint256 _dateOfBirth, 
    uint8 _gender,
    string memory _email, 
    string memory _phoneNumber
) public {
    require(msg.sender == admin, "Only admin can add black belts");
    require(_walletAddress != address(0), "Invalid wallet address");

    Gender gender = Gender(_gender);
    judokaCount++;
    judokas[judokaCount] = Judoka({
        id: judokaCount,
        name: _name,
        walletAddress: _walletAddress,
        beltLevel: BeltLevel.Black,
        dateOfBirth: _dateOfBirth,
        gender: gender,
        email: _email,
        phoneNumber: _phoneNumber
        // No need to initialize the array fields here
    });

    judokaIds[_walletAddress] = judokaCount;
    emit JudokaRegistered(
        judokaCount, 
        _name, 
        _walletAddress, 
        BeltLevel.Black, 
        _dateOfBirth,
        gender, 
        _email, 
        _phoneNumber,
        block.timestamp
    );
}



function registerJudoka(
    string memory _name, 
    address _walletAddress, 
    uint256 _dateOfBirth, 
    uint8 _gender, 
    string memory _email, 
    string memory _phoneNumber
) public {
        require(_walletAddress != address(0), "Invalid wallet address");
        require(judokaIds[_walletAddress] == 0, "Judoka already registered");

    Gender gender = Gender(_gender);
    judokaCount++;
    judokas[judokaCount] = Judoka({
        id: judokaCount,
        name: _name,
        walletAddress: _walletAddress,
        beltLevel: BeltLevel.Black,
        dateOfBirth: _dateOfBirth,
        gender: gender,
        email: _email,
        phoneNumber: _phoneNumber
        // No need to initialize the array fields here
    });


        judokaIds[_walletAddress] = judokaCount;
        emit JudokaRegistered(
            judokaCount, 
            _name, 
            _walletAddress, 
            BeltLevel.White, 
            _dateOfBirth,
            gender, 
            _email, 
            _phoneNumber,
            block.timestamp
        );
    }


    function getJudokaInfo(uint256 _id) public view returns (Judoka memory) {
        return judokas[_id];
    }

    function getBeltLevel(uint256 _id) public view returns (BeltLevel) {
        require(_id > 0 && _id <= judokaCount, "Judoka does not exist.");
        return judokas[_id].beltLevel;
    }

    function promoteJudoka(uint256 _id, BeltLevel _newBeltLevel) public {
        require(
            isBlackBelt(msg.sender) || msg.sender == admin,
            "Only black belts or admin can promote judokas"
        );
        require(_id > 0 && _id <= judokaCount, "Judoka does not exist.");
        require(
            _newBeltLevel > judokas[_id].beltLevel,
            "New level must be higher"
        );

        BeltLevel oldBeltLevel = judokas[_id].beltLevel;
        judokas[_id].beltLevel = _newBeltLevel;
        emit BeltLevelUpdated(_id, oldBeltLevel, _newBeltLevel, block.timestamp);
    }

    function isBlackBelt(address _address) public view returns(bool) {
        return judokas[judokaIds[_address]].beltLevel == BeltLevel.Black;
    }

    function isAuthorized(uint256 _id, address _sender) public view returns(bool) {
        return _sender == judokas[_id].walletAddress || _sender == admin;
    }

    function isAdmin(address _sender) public view returns(bool) {
        return _sender == admin;
    }

    function updateJudokaPoints(uint256 _id, uint256 _points) public onlyAdmin {
        require(_id > 0 && _id <= judokaCount, "Invalid Judoka ID");
        judokaPoints[_id] += _points;
    }

    // Functions from JudoCompetition
    function createCompetition(
        string memory _name, 
        uint256 _date
        ) public {
        require(msg.sender == admin, "Only admin can add competitions");
        //require(_walletAddress != address(0), "Invalid wallet address");


        competitionCount++;
        competitions[competitionCount] = Competition(
            competitionCount, 
            _name, 
            _date, 
            new address[](0), 
            false, 
            address(0));
        emit CompetitionCreated(competitionCount, _name, _date);
    }


    function addParticipant(uint256 _competitionId, address _participant) public onlyAdmin {
        require(!competitions[_competitionId].completed, "Competition already completed");
        competitions[_competitionId].participants.push(_participant);
        emit ParticipantAdded(_competitionId, _participant);
    }

    function recordCompetitionResult(uint256 _competitionId, address _winner, uint256 _points) public onlyAdmin {
        require(!competitions[_competitionId].completed, "Competition already completed");
        competitions[_competitionId].completed = true;
        competitions[_competitionId].winner = _winner;

        uint256 winnerId = judokaIds[_winner];
        updateJudokaPoints(winnerId, _points);

        emit CompetitionResultRecorded(_competitionId, _winner);
    }
}
