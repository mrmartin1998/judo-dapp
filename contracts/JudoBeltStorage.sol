// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract JudoBeltStorage {
    enum BeltLevel { White, Yellow, Orange, Green, Blue, Brown, Black }
    mapping(address => BeltLevel) public judokaBelts;

    address public admin;
    address constant blackBelt1 = 0x6bD300EcFc394Dd230f81B5D4e0D003416dcBAdF;
    address constant blackBelt2 = 0x01555EEE2732C708BB8D628E44366Ff0Bb19CF33;

    // Addresses of allowed contracts
    address public userRegistrationAddress;
    address public beltPromotionAddress;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    constructor() {
        admin = msg.sender;
        judokaBelts[blackBelt1] = BeltLevel.Black;
        judokaBelts[blackBelt2] = BeltLevel.Black;
    }

    function setContractAddresses(address _userRegistrationAddress, address _beltPromotionAddress) external onlyAdmin {
        userRegistrationAddress = _userRegistrationAddress;
        beltPromotionAddress = _beltPromotionAddress;
    }

    function setBeltLevel(address judoka, BeltLevel belt, address caller) public {
        require(
            msg.sender == userRegistrationAddress || msg.sender == beltPromotionAddress,
            "Only specific contracts can call this function"
        );
        require(
            caller == admin || judokaBelts[caller] == BeltLevel.Black,
            "Only admin or black belts can modify belt levels"
        );
        judokaBelts[judoka] = belt;
    }

    function getBeltLevel(address judoka) external view returns (BeltLevel) {
        return judokaBelts[judoka];
    }
}
