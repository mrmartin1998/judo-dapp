// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract JudoBeltSystem {
    enum BeltLevel { White, Yellow, Orange, Green, Blue, Brown, Black }

    struct User {
        BeltLevel belt;
        bool isSensei;
    }

    mapping(address => User) public users;

    event UserRegistered(address indexed wallet, BeltLevel belt);
    event UserPromoted(address indexed wallet, BeltLevel belt);

    // Modifier to check if the caller is a sensei (black belt)
    modifier onlySensei() {
        require(users[msg.sender].isSensei, "Only a sensei can perform this action.");
        _;
    }

    // Constructor to set the initial senseis during contract deployment
    constructor(address[] memory senseiWallets) {
        for (uint256 i = 0; i < senseiWallets.length; i++) {
            users[senseiWallets[i]] = User({
                belt: BeltLevel.Black,
                isSensei: true
            });
            emit UserRegistered(senseiWallets[i], BeltLevel.Black);
        }
    }

    // Register a new user with their selected belt level
    function registerUser(BeltLevel initialBelt) external {
        require(users[msg.sender].belt == BeltLevel.White, "User is already registered.");
        users[msg.sender] = User({
            belt: initialBelt,
            isSensei: false
        });
        emit UserRegistered(msg.sender, initialBelt);
    }

    // Promote a student to the selected new belt level
    function promoteStudent(address studentWallet, BeltLevel newBelt) external onlySensei {
        require(users[studentWallet].belt != BeltLevel.Black, "Cannot promote a black belt.");
        require(users[studentWallet].belt < newBelt, "Cannot demote or stay at the same level.");
        users[studentWallet].belt = newBelt;
        emit UserPromoted(studentWallet, newBelt);
    }

    // Get the belt level of a student
    function getBeltLevel(address studentWallet) external view returns (BeltLevel) {
        return users[studentWallet].belt;
    }
}
