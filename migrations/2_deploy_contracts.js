const JudoBeltStorage = artifacts.require("JudoBeltStorage");
const JudokaRegistration = artifacts.require("JudokaRegistration");
const BeltPromotionManagement = artifacts.require("BeltPromotionManagement");

module.exports = async function(deployer) {
    try {
        await deployer.deploy(JudoBeltStorage);
        const storageInstance = await JudoBeltStorage.deployed();

        await deployer.deploy(JudokaRegistration, storageInstance.address);
        const registrationInstance = await JudokaRegistration.deployed();
        await deployer.deploy(BeltPromotionManagement, storageInstance.address);
        const promotionInstance = await BeltPromotionManagement.deployed();
    
        console.log("Deployed addresses:");
        console.log(`JudoBeltStorage: ${storageInstance.address}`);
        console.log(`JudokaRegistration: ${registrationInstance.address}`);
        console.log(`BeltPromotionManagement: ${promotionInstance.address}`);
    } catch (error) {
        console.error("Error deploying contracts:", error);
    }
};    