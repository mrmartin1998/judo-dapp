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
