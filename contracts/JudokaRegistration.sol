// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./JudoBeltStorage.sol";

contract JudokaRegistration {
    JudoBeltStorage private beltStorage;

    event JudokaRegistered(uint256 indexed id, string name, address walletAddress);

    constructor(address _beltStorageAddress) {
        beltStorage = JudoBeltStorage(_beltStorageAddress);
    }

    function registerJudoka(string memory _name, address _walletAddress) public {
        // Ensure that the wallet address is not already registered
        require(beltStorage.judokaIds(_walletAddress) == 0, "Wallet already registered");
        // Call the public function in JudoBeltStorage to add a new judoka
        beltStorage.addJudoka(_name, _walletAddress);
        emit JudokaRegistered(beltStorage.judokaCount(), _name, _walletAddress);
    }
}
