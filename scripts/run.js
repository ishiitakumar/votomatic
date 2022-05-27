const main = async ()=>{
    const voteContractFactory = await hre.ethers.getContractFactory("Voting"); //hre-hardhat runtime env; contract factory - creates artifacts(files req to work with the contract at runtime)
    const voteContract = await voteContractFactory.deploy(); //contract deployed - await: wait till it is deployed then move ahead
    await voteContract.deployed();
    console.log("contract deployed to: ",voteContract.address);
}

const runmain = async ()=>{
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

runmain();