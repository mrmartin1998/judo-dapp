// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract JudoBeltStorage is Initializable, OwnableUpgradeable {
    enum BeltLevel { White, Yellow, Orange, Green, Blue, Brown, Black }
    mapping(address => BeltLevel) public judokaBelts;

    function initialize(address[] memory initialBlackBelts) public initializer {
        __Ownable_init();
        for (uint i = 0; i < initialBlackBelts.length; i++) {
            judokaBelts[initialBlackBelts[i]] = BeltLevel.Black;
        }
    }

    function setBeltLevel(address judoka, BeltLevel belt) public onlyOwner {
        require(
            judokaBelts[msg.sender] == BeltLevel.Black || msg.sender == owner(), 
            "Only black belts or owner can modify belt levels"
        );
        judokaBelts[judoka] = belt;
    }

    function getBeltLevel(address judoka) public view returns (BeltLevel) {
        return judokaBelts[judoka];
    }
}
