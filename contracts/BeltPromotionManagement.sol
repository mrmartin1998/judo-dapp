// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./JudoBeltStorage.sol";

contract BeltPromotionManagement {
    JudoBeltStorage private beltStorage;

    // Event to be emitted when a judoka is promoted
    event JudokaPromoted(uint256 indexed judokaId, JudoBeltStorage.BeltLevel newBeltLevel);

    constructor(address _beltStorageAddress) {
        beltStorage = JudoBeltStorage(_beltStorageAddress);
    }

    // Function to promote a judoka to a higher belt level
    function promoteJudoka(uint256 _judokaId, JudoBeltStorage.BeltLevel _newBeltLevel) public {
        require(_judokaId > 0 && _judokaId <= beltStorage.judokaCount(), "Judoka does not exist.");
        JudoBeltStorage.BeltLevel currentBeltLevel = beltStorage.getJudoka(_judokaId).beltLevel;
        require(uint(_newBeltLevel) > uint(currentBeltLevel), "New belt level must be higher than current level.");
        
        // Update the belt level in the JudoBeltStorage contract
        beltStorage.setBeltLevel(_judokaId, _newBeltLevel);

        // Emit an event for successful promotion
        emit JudokaPromoted(_judokaId, _newBeltLevel);
    }
}
