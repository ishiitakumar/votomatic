//SPDX-License-Identifier:UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Voting{
    address public owner;
    struct Candidate{
        uint id;
        uint age;
        string name;
        uint votes; 
    }
    uint public candidateCount;
    Candidate [] public Candidates;
    mapping(address=>bool) public voterlist; 
    function addCandidate(string memory _name, uint _age) public{
        require(_age>=25,"Not eligible"); //left : reqiured cond , right: error msg
        Candidate memory c;
        c.age = _age;
        c.name = _name;
        c.id = candidateCount+1;
        Candidates.push(c);
        candidateCount++;
    }

    function createElection() public{
        addCandidate("Ishita", 25);
        addCandidate("Saumya", 27);
    }

    function vote(uint _id) public{
        require(!voterlist[msg.sender], "Already voted");
        require(_id<=candidateCount && _id>0,"Invalid id");
        Candidates[_id-1].votes++;
        voterlist[msg.sender]=true;
    }

    constructor(){
        owner = msg.sender; //whoever calls the function is the msg.sender for that function. constructor is called when the contract is creater so whoever calls it will be the owner
        createElection();
        // console.log("Contract created");
    }
}