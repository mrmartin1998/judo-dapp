// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IJudoBeltStorage {
    enum BeltLevel { White, Yellow, Orange, Green, Blue, Brown, Black }
    function setBeltLevel(address judoka, BeltLevel belt) external;
    function getBeltLevel(address judoka) external view returns (BeltLevel);
}