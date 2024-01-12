const JudoBeltStorage = artifacts.require("JudoBeltStorage");
const JudoUserRegistration = artifacts.require("JudoUserRegistration");
const JudoBeltPromotion = artifacts.require("JudoBeltPromotion");

module.exports = async function(deployer) {
    try {
        await deployer.deploy(JudoBeltStorage);
        const storageInstance = await JudoBeltStorage.deployed();

        await deployer.deploy(JudoUserRegistration, storageInstance.address);
        await deployer.deploy(JudoBeltPromotion, storageInstance.address);

        console.log("Deployed addresses:");
        console.log(`JudoBeltStorage: ${storageInstance.address}`);
        console.log(`JudoUserRegistration: ${JudoUserRegistration.address}`);
        console.log(`JudoBeltPromotion: ${JudoBeltPromotion.address}`);
    } catch (error) {
        console.error("Error deploying contracts:", error);
    }
};

