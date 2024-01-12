// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./JudoBeltStorage.sol";

contract JudoBeltPromotion {
    JudoBeltStorage private beltStorage;

    constructor(address storageAddress) {
        beltStorage = JudoBeltStorage(storageAddress);
    }

    function promoteJudoka(address judoka) public {
        require(beltStorage.isBlackBelt(msg.sender), "Only black belts can promote judokas");
        JudoBeltStorage.BeltLevel currentBelt = beltStorage.getBeltLevel(judoka);
        require(currentBelt != JudoBeltStorage.BeltLevel.Black, "Cannot promote beyond black belt");
        beltStorage.setBeltLevel(judoka, JudoBeltStorage.BeltLevel(uint(currentBelt) + 1));
    }
}
