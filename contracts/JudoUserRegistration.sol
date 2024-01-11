// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./JudoBeltStorageInterface.sol";

contract JudoUserRegistration {
    IJudoBeltStorage private beltStorage;

    constructor(address storageAddress) {
        beltStorage = IJudoBeltStorage(storageAddress);
    }

    function registerUser(address user) public {
        require(beltStorage.getBeltLevel(msg.sender) == IJudoBeltStorage.BeltLevel.Black, "Only black belts can register users");
        beltStorage.setBeltLevel(user, IJudoBeltStorage.BeltLevel.White, msg.sender);
    }
}
