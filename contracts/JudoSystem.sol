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
        uint256 age;
        uint256 weight;
        string club;
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
    mapping(uint256 => Judoka) public judokas;
    mapping(address => uint256) public judokaIds;
    mapping(uint256 => uint256) public judokaPoints;
    mapping(uint256 => Competition) public competitions;
    address public admin;

    event JudokaRegistered(uint256 indexed id, string name, address walletAddress, BeltLevel beltLevel, uint256 dateOfBirth, Gender gender, string email, string phoneNumber, uint256 timestamp);
    event BeltLevelUpdated(uint256 indexed id, BeltLevel oldBeltLevel, BeltLevel newBeltLevel, uint256 timestamp);
    event CompetitionCreated(uint256 indexed id, string name, uint256 date);
    event ParticipantAdded(uint256 indexed competitionId, address participant);
    event CompetitionResultRecorded(uint256 indexed competitionId, address firstPlace, address secondPlace, address thirdPlace, address fourthPlace);

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
    string memory _phoneNumber,
    uint256 _age,
    uint256 _weight,
    string memory _club
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
        phoneNumber: _phoneNumber,
        age: _age,
        weight: _weight,
        club: _club
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
    string memory _phoneNumber,
    uint256 _age,
    uint256 _weight,
    string memory _club
) public {
        require(_walletAddress != address(0), "Invalid wallet address");
        require(judokaIds[_walletAddress] == 0, "Judoka already registered");

    Gender gender = Gender(_gender);
    judokaCount++;
    judokas[judokaCount] = Judoka({
        id: judokaCount,
        name: _name,
        walletAddress: _walletAddress,
        beltLevel: BeltLevel.White,
        dateOfBirth: _dateOfBirth,
        gender: gender,
        email: _email,
        phoneNumber: _phoneNumber,
        age: _age,
        weight: _weight,
        club: _club
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
        participants: new address[](0) ,
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
        competitions[_competitionId].results = CompetitionResult(_firstPlace, _secondPlace, _thirdPlace, _fourthPlace);

        if(_firstPlacePoints > 0) {
            updateJudokaPoints(judokaIds[_firstPlace], _firstPlacePoints);
        }
        if(_secondPlacePoints > 0) {
            updateJudokaPoints(judokaIds[_secondPlace], _secondPlacePoints);
        }
        if(_thirdPlacePoints > 0) {
            updateJudokaPoints(judokaIds[_thirdPlace], _thirdPlacePoints);
        }
        if(_fourthPlacePoints > 0) {
            updateJudokaPoints(judokaIds[_fourthPlace], _fourthPlacePoints);
        }

        emit CompetitionResultRecorded(_competitionId, _firstPlace, _secondPlace, _thirdPlace, _fourthPlace);
    }
}