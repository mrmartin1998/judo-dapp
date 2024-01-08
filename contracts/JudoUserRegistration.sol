// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./JudoBeltStorage.sol";

contract JudoUserRegistration {
    JudoBeltStorage private storageContract;

    constructor(address _storageAddress) {
        storageContract = JudoBeltStorage(_storageAddress);
    }

    function registerUser(address userAddress, JudoBeltStorage.BeltLevel belt) public {
        require(storageContract.getBeltLevel(msg.sender) == JudoBeltStorage.BeltLevel.Black, "Only black belts can register users");
        storageContract.setBeltLevel(userAddress, belt);
    }
}
