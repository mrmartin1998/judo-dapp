// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./JudoBeltStorage.sol";

contract JudoUserRegistration {
    JudoBeltStorage private storageContract;

    constructor(address _storageAddress) {
        storageContract = JudoBeltStorage(_storageAddress);
    }

    function registerUser(address userAddress, JudoBeltStorage.BeltLevel belt) public {
        require(storageContract.senseis(msg.sender), "Only senseis can register users");
        storageContract.setBeltLevel(userAddress, belt);
    }
}
