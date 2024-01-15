// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract JudoBeltStorage {
    enum BeltLevel { White, Yellow, Orange, Green, Blue, Brown, Black }
    mapping(address => BeltLevel) public judokaBelts;

    address public admin;
    address[] public blackBelts;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    constructor() {
        admin = msg.sender;
        // Initialize black belts
        blackBelts.push(admin); // Admin is a black belt by default
    }

    function addBlackBelt(address blackBeltAddress) external onlyAdmin {
        blackBelts.push(blackBeltAddress);
        judokaBelts[blackBeltAddress] = BeltLevel.Black;
    }

    function setBeltLevel(address judoka, BeltLevel belt) public {
        require(isBlackBelt(msg.sender), "Only black belts can modify belt levels");
        judokaBelts[judoka] = belt;
    }

    function getBeltLevel(address judoka) external view returns (BeltLevel) {
        return judokaBelts[judoka];
    }

    function isBlackBelt(address judoka) public view returns(bool) {
        for(uint i = 0; i < blackBelts.length; i++) {
            if(blackBelts[i] == judoka) {
                return true;
            }
        }
        return false;
    }
}


/*

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

    event JudokaRegistered(uint256 indexed id, string name, address walletAddress, BeltLevel beltLevel);
    event BeltLevelUpdated(uint256 indexed id, BeltLevel newBeltLevel);

    constructor() {
        admin = msg.sender;
    }

    function registerJudoka(string memory _name, address _walletAddress) public {
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

    function setBeltLevel(uint256 _id, BeltLevel _beltLevel) public {
        require(_id > 0 && _id <= judokaCount, "Judoka does not exist.");
        require(judokas[_id].walletAddress == msg.sender || msg.sender == admin, "Unauthorized.");
        judokas[_id].beltLevel = _beltLevel;
        emit BeltLevelUpdated(_id, _beltLevel);
    }
}


*/