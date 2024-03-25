const JudoSystem = artifacts.require("JudoSystem");

module.exports = async function(deployer) {
    try {
        // Deploy the JudoSystem contract
        await deployer.deploy(JudoSystem);
        const judoSystemInstance = await JudoSystem.deployed();

        // Output the address of the deployed contract
        console.log("Deployed address:");
        console.log(`JudoSystem: ${judoSystemInstance.address}`);
    } catch (error) {
        console.error("Error deploying contract:", error);
    }
};
