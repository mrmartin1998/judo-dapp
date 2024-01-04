// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract JudoBeltStorage {
    enum BeltLevel { White, Yellow, Orange, Green, Blue, Brown, Black }

    mapping(address => BeltLevel) private judokaBelts;

    address admin; // The address of the admin, likely the deployer initially

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    constructor() {
        admin = msg.sender; // Assign the deployer as the initial admin
    }

    function setBeltLevel(address judoka, BeltLevel belt) external onlyAdmin {
        judokaBelts[judoka] = belt;
    }

    function getBeltLevel(address judoka) external view returns (BeltLevel) {
        return judokaBelts[judoka];
    }

    function transferAdminship(address newAdmin) external onlyAdmin {
        admin = newAdmin;
    }
}
