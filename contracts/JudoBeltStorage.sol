// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract JudoBeltStorage {
    enum BeltLevel { White, Yellow, Orange, Green, Blue, Brown, Black }

    struct Judoka {
        uint256 id;
        string name;
        address walletAddress;
        BeltLevel beltLevel;
    }

    uint256 public judokaCount;
    mapping(uint256 => Judoka) public judokas;
    mapping(address => uint256) public judokaIds;
    address public admin;
    address public registrationContract;

    address constant blackBelt1 = 0x6bD300EcFc394Dd230f81B5D4e0D003416dcBAdF; // Replace with actual address
    address constant blackBelt2 = 0x01555EEE2732C708BB8D628E44366Ff0Bb19CF33; // Replace with actual address

event JudokaRegistered(uint256 indexed id, string name, address walletAddress, BeltLevel beltLevel);
event BeltLevelUpdated(uint256 indexed id, BeltLevel newBeltLevel);

constructor() {
    admin = msg.sender;
}

modifier onlyAdmin() {
    require(msg.sender == admin, "Only admin can perform this action");
    _;
}

modifier onlyBlackBelts() {
    require(msg.sender == blackBelt1 || msg.sender == blackBelt2, "Not a black belt");
    _;
}

function setRegistrationContract(address _registrationContract) public onlyAdmin {
    registrationContract = _registrationContract;
}

function addJudoka(string memory _name, address _walletAddress) public onlyAdmin {
    require(_walletAddress != address(0), "Invalid wallet address");
    judokaCount++;
    judokas[judokaCount] = Judoka(judokaCount, _name, _walletAddress, BeltLevel.White);
    judokaIds[_walletAddress] = judokaCount;
    emit JudokaRegistered(judokaCount, _name, _walletAddress, BeltLevel.White);
}

function getJudoka(uint256 _id) public view returns (Judoka memory) {
    require(_id > 0 && _id <= judokaCount, "Judoka does not exist.");
    return judokas[_id];
}

function setBeltLevel(uint256 _id, BeltLevel _beltLevel) public onlyBlackBelts {
    require(_id > 0 && _id <= judokaCount, "Judoka does not exist.");
    judokas[_id].beltLevel = _beltLevel;
    emit BeltLevelUpdated(_id, _beltLevel);
}
}
