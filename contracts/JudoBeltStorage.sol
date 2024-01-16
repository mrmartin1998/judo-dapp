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

    event JudokaRegistered(uint256 indexed id, string name, address walletAddress, BeltLevel beltLevel);
    event BeltLevelUpdated(uint256 indexed id, BeltLevel newBeltLevel);

    function addJudoka(string memory _name, address _walletAddress) public {
        require(_walletAddress != address(0), "Invalid wallet address");
        judokaCount++;
        judokas[judokaCount] = Judoka(judokaCount, _name, _walletAddress, BeltLevel.White);
        judokaIds[_walletAddress] = judokaCount;
        emit JudokaRegistered(judokaCount, _name, _walletAddress, BeltLevel.White);
    }

    function setBeltLevel(uint256 _id, BeltLevel _beltLevel) public {
        require(_id > 0 && _id <= judokaCount, "Judoka does not exist.");
        judokas[_id].beltLevel = _beltLevel;
        emit BeltLevelUpdated(_id, _beltLevel);
    }

    function getJudoka(uint256 _id) public view returns (Judoka memory) {
        require(_id > 0 && _id <= judokaCount, "Judoka does not exist.");
        return judokas[_id];
    }
}
