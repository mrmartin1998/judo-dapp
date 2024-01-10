// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./JudoBeltStorage.sol";

contract JudoUserRegistration {
    JudoBeltStorage private beltStorage;

    constructor(address storageAddress) {
        beltStorage = JudoBeltStorage(storageAddress);
    }

    function registerUser(address user) public {
        require(beltStorage.getBeltLevel(msg.sender) == JudoBeltStorage.BeltLevel.Black, "Only black belts can register users");
        beltStorage.setBeltLevel(user, JudoBeltStorage.BeltLevel.White, msg.sender);
    }
}
