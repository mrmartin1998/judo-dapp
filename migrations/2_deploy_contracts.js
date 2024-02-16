const JudoBeltSystem = artifacts.require("JudoBeltSystem");
const JudoCompetition = artifacts.require("JudoCompetition");

module.exports = async function(deployer) {
    try {
        // Deploy the JudoBeltSystem contract
        await deployer.deploy(JudoBeltSystem);
        const beltSystemInstance = await JudoBeltSystem.deployed();

        // Deploy the JudoCompetition contract
        await deployer.deploy(JudoCompetition); // Removed the parameter
        const competitionInstance = await JudoCompetition.deployed();
    
        // Output the addresses of the deployed contracts
        console.log("Deployed addresses:");
        console.log(`JudoBeltSystem: ${beltSystemInstance.address}`);
        console.log(`JudoCompetition: ${competitionInstance.address}`);
    } catch (error) {
        console.error("Error deploying contracts:", error);
    }
};
