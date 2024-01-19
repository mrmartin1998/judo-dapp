// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract JudoBeltSystem {
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

    function registerBlackBelt(string memory _name, address _walletAddress) public {
        require(msg.sender == admin, "Only admin can add black belts");
        require(_walletAddress != address(0), "Invalid wallet address");
        judokaCount++;
        judokas[judokaCount] = Judoka(judokaCount, _name, _walletAddress, BeltLevel.Black);
        judokaIds[_walletAddress] = judokaCount;
        emit JudokaRegistered(judokaCount, _name, _walletAddress, BeltLevel.Black);
    }

    function registerJudoka(string memory _name, address _walletAddress) public {
        require(_walletAddress != address(0), "Invalid wallet address");
        require(judokaIds[_walletAddress] == 0, "Judoka already registered");
        judokaCount++;
        judokas[judokaCount] = Judoka(judokaCount, _name, _walletAddress, BeltLevel.White);
        judokaIds[_walletAddress] = judokaCount;
        emit JudokaRegistered(judokaCount, _name, _walletAddress, BeltLevel.White);
    }

    function getBeltLevel(uint256 _id) public view returns (BeltLevel) {
        require(_id > 0 && _id <= judokaCount, "Judoka does not exist.");
        return judokas[_id].beltLevel;
    }

    function promoteJudoka(uint256 _id, BeltLevel _newBeltLevel) public {
        require(isBlackBelt(msg.sender), "Only black belts can promote judokas");
        require(_id > 0 && _id <= judokaCount, "Judoka does not exist.");
        require(_newBeltLevel > judokas[_id].beltLevel, "New level must be higher");
        judokas[_id].beltLevel = _newBeltLevel;
        emit BeltLevelUpdated(_id, _newBeltLevel);
    }

    function isBlackBelt(address _address) public view returns(bool) {
        return judokas[judokaIds[_address]].beltLevel == BeltLevel.Black;
    }
}
