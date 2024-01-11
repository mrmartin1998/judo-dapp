// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./JudoBeltStorageInterface.sol";

contract JudoBeltPromotion {
    IJudoBeltStorage private beltStorage;

    constructor(address storageAddress) {
        beltStorage = IJudoBeltStorage(storageAddress);
    }

    function promoteJudoka(address judoka) public {
        require(beltStorage.getBeltLevel(msg.sender) == IJudoBeltStorage.BeltLevel.Black, "Only black belts can promote judokas");
        IJudoBeltStorage.BeltLevel currentBelt = beltStorage.getBeltLevel(judoka);
        require(currentBelt != IJudoBeltStorage.BeltLevel.Black, "Cannot promote beyond black belt");
        beltStorage.setBeltLevel(judoka, IJudoBeltStorage.BeltLevel(uint(currentBelt) + 1), msg.sender);
    }
}
