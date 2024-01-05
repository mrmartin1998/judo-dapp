// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract JudoBeltStorage {
    enum BeltLevel { White, Yellow, Orange, Green, Blue, Brown, Black }
    mapping(address => BeltLevel) private judokaBelts;
    mapping(address => bool) public senseis;

    address public admin;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function setBeltLevel(address judoka, BeltLevel belt) external onlyAdmin {
        judokaBelts[judoka] = belt;
        if(belt == BeltLevel.Black) {
            senseis[judoka] = true;
        }
    }

    function getBeltLevel(address judoka) external view returns (BeltLevel) {
        return judokaBelts[judoka];
    }

    function initializeSenseis(address[] calldata senseiAddresses) external onlyAdmin {
        for(uint i = 0; i < senseiAddresses.length; i++) {
            senseis[senseiAddresses[i]] = true;
            judokaBelts[senseiAddresses[i]] = BeltLevel.Black;
        }
    }

    function transferAdminship(address newAdmin) external onlyAdmin {
        admin = newAdmin;
    }
}
