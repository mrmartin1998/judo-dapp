// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract JudoBeltStorage {
    enum BeltLevel { White, Yellow, Orange, Green, Blue, Brown, Black }
    mapping(address => BeltLevel) public judokaBelts;

    address public admin;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    constructor(address[] memory initialBlackBelts) {
        admin = msg.sender;
        for (uint i = 0; i < initialBlackBelts.length; i++) {
            judokaBelts[initialBlackBelts[i]] = BeltLevel.Black;
        }
    }

    function setBeltLevel(address judoka, BeltLevel belt) external {
        require(
            judokaBelts[msg.sender] == BeltLevel.Black || msg.sender == admin, 
            "Only black belts or admin can modify belt levels"
        );
        judokaBelts[judoka] = belt;
    }

    function getBeltLevel(address judoka) external view returns (BeltLevel) {
        return judokaBelts[judoka];
    }

    function transferAdminship(address newAdmin) external onlyAdmin {
        admin = newAdmin;
    }
}
