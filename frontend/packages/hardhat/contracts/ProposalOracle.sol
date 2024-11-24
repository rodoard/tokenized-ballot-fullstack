// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProposalOracle {
    // Proposal data structure
    struct Proposal {
        string title;
        uint256 createdAt;
    }

    Proposal[] public proposals;
    string public proposalType;
    mapping(string => bool) public proposalExists;

   function setType(string memory _type) external {
      proposalType = _type;
   }
   
    function addProposal( string memory title) public {
        require(!proposalExists[title], "Proposal with this ID already exists");

        // Create a new proposal
        proposals.push(Proposal({
            title: title,
            createdAt: block.timestamp
        }));

        // Mark the proposal ID as existing
        proposalExists[title] = true;
    }

    function getProposals() external view returns (Proposal[] memory) {
        return proposals;
    }
}
