const JudoBeltSystem = artifacts.require("JudoBeltSystem");

module.exports = async function(deployer) {
    try {
        // Deploy the JudoBeltSystem contract
        await deployer.deploy(JudoBeltSystem);
        const beltSystemInstance = await JudoBeltSystem.deployed();
    
        console.log("Deployed addresses:");
        console.log(`JudoBeltSystem: ${beltSystemInstance.address}`);
    } catch (error) {
        console.error("Error deploying contracts:", error);
    }
};
