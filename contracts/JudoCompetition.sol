// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract JudoCompetition {
    struct Competition {
        uint256 id;
        string name;
        uint256 date; // Unix timestamp for the competition date
        address[] participants;
        bool completed;
        address winner;
    }

    uint256 public competitionCount;
    mapping(uint256 => Competition) public competitions;
    address public admin;

    event CompetitionCreated(uint256 indexed id, string name, uint256 date);
    event ParticipantAdded(uint256 indexed competitionId, address participant);
    event CompetitionResultRecorded(uint256 indexed competitionId, address winner);

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    function createCompetition(string memory _name, uint256 _date) public onlyAdmin {
        competitionCount++;
        competitions[competitionCount] = Competition(competitionCount, _name, _date, new address[](0), false, address(0));
        emit CompetitionCreated(competitionCount, _name, _date);
    }

    function addParticipant(uint256 _competitionId, address _participant) public onlyAdmin {
        require(!competitions[_competitionId].completed, "Competition already completed");
        competitions[_competitionId].participants.push(_participant);
        emit ParticipantAdded(_competitionId, _participant);
    }

    function recordCompetitionResult(uint256 _competitionId, address _winner) public onlyAdmin {
        require(!competitions[_competitionId].completed, "Competition already completed");
        competitions[_competitionId].completed = true;
        competitions[_competitionId].winner = _winner;
        emit CompetitionResultRecorded(_competitionId, _winner);
        // Integrate with JudoBeltSystem to update points - will be implemented in integration
    }

    // Additional helper functions as needed
}
