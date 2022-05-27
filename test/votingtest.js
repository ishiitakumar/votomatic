const {expect} = require("chai");
const {ethers} = require("hardhat");

describe("Voting contract", ()=>{
    let voteContractFactory;
    let voteContract;
    let contractOwner;
    beforeEach(async ()=>{
        [contractOwner] = await ethers.getSigners();
        voteContractFactory = await ethers.getContractFactory("Voting");
        voteContract = await voteContractFactory.deploy();
    })
    describe("deployment", ()=>{
        it("Owner is correct", async ()=>{
            expect(await voteContract.owner()).to.equal(contractOwner.address);
        })
        it("Count of candidates is correct", async ()=>{
            expect(await voteContract.candidateCount()).to.equal(2);
        })
        it("Candidate info is right", async ()=>{
            let c1 = await voteContract.Candidates(0);
            expect(c1.id).to.equal(1);
            expect(c1.name).to.equal("Ishita");
            expect(c1.age).to.equal(25);
            expect(c1.votes).to.equal(0);
            let c2 = await voteContract.Candidates(1);
            expect(c2.id).to.equal(2);
            expect(c2.name).to.equal("Saumya");
            expect(c2.age).to.equal(27);
            expect(c2.votes).to.equal(0);
        })
    })
    describe("Voting", ()=>{
        it("Vote count increases", async ()=>{
            let c1 = await voteContract.Candidates(0);
            expect(c1.votes).to.equal(0);
            // let votetx =  await voteContract.vote(1);
            // await votetx.wait();
            await voteContract.vote(1);
            c1 = await voteContract.Candidates(0);
            expect(c1.votes).to.equal(1);
            await expect(voteContract.vote(1)).to.be.revertedWith("Already voted");
        })
    })
})