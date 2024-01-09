// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./JudoBeltStorage.sol";

contract JudoBeltPromotion {
    JudoBeltStorage private storageContract;

    constructor(address _storageAddress) {
        storageContract = JudoBeltStorage(_storageAddress);
    }

    function promoteJudoka(address judoka) public {
        require(storageContract.getBeltLevel(msg.sender) == JudoBeltStorage.BeltLevel.Black, "Only black belts can promote judokas");
        JudoBeltStorage.BeltLevel currentBelt = storageContract.getBeltLevel(judoka);
        require(currentBelt < JudoBeltStorage.BeltLevel.Black, "Cannot promote beyond black belt");
        
        // Promote to the next belt level
        storageContract.setBeltLevel(judoka, JudoBeltStorage.BeltLevel(uint(currentBelt) + 1));
    }
}
