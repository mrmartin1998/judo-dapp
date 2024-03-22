// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract JudoBeltSystem {
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

    uint256 public judokaCount;
    mapping(uint256 => Judoka) public judokas;
    mapping(address => uint256) public judokaIds;
    address public admin;

    event JudokaRegistered(
        uint256 indexed id, 
        string name, 
        address walletAddress, 
        BeltLevel beltLevel, 
        uint256 dateOfBirth,
        Gender gender,
        string email,
        string phoneNumber,
        uint256 timestamp
    );

    event BeltLevelUpdated(
        uint256 indexed id, 
        BeltLevel oldBeltLevel, 
        BeltLevel newBeltLevel, 
        uint256 timestamp
    );

    constructor() {
        admin = msg.sender;
    }

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

        Gender gender = Gender(_gender); // Casting uint8 to Gender enum
        judokaCount++;
        judokas[judokaCount] = Judoka(
            judokaCount, 
            _name, 
            _walletAddress, 
            BeltLevel.Black, 
            _dateOfBirth,
            gender, // Using the casted enum value
            _email, 
            _phoneNumber
        );
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
        uint8 _gender, // Accepting uint8 for gender
        string memory _email, 
        string memory _phoneNumber
    ) public {
        require(_walletAddress != address(0), "Invalid wallet address");
        require(judokaIds[_walletAddress] == 0, "Judoka already registered");

        Gender gender = Gender(_gender); // Casting uint8 to Gender enum
        judokaCount++;
        judokas[judokaCount] = Judoka(
            judokaCount, 
            _name, 
            _walletAddress, 
            BeltLevel.White, 
            _dateOfBirth,
            gender, // Using the casted enum value
            _email, 
            _phoneNumber
        );
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

        // In your Solidity contract, there should be something like this:
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
}