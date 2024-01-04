// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./JudoBeltStorage.sol";

contract JudoUserRegistration {
    JudoBeltStorage private storageContract;

    constructor(address _storageAddress) {
        storageContract = JudoBeltStorage(_storageAddress);
    }

    function registerUser(address userAddress, JudoBeltStorage.BeltLevel belt) public {
        // Ensure that only authorized users (like admins or senseis) can register new users
        storageContract.setBeltLevel(userAddress, belt);
    }
}
