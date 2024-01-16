// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./JudoBeltStorage.sol";

contract BeltPromotionManagement {
    JudoBeltStorage private beltStorage;

    event JudokaPromoted(uint256 indexed judokaId, JudoBeltStorage.BeltLevel newBeltLevel);

    constructor(address _beltStorageAddress) {
        beltStorage = JudoBeltStorage(_beltStorageAddress);
    }

    function promoteJudoka(uint256 _judokaId, JudoBeltStorage.BeltLevel _newBeltLevel) public {
require(beltStorage.getJudoka(_judokaId).id == _judokaId, "Judoka does not exist.");
    JudoBeltStorage.BeltLevel currentBeltLevel = beltStorage.getJudoka(_judokaId).beltLevel;
    require(uint(_newBeltLevel) > uint(currentBeltLevel), "New belt level must be higher than current level.");

    beltStorage.setBeltLevel(_judokaId, _newBeltLevel);
    emit JudokaPromoted(_judokaId, _newBeltLevel);
}
}
