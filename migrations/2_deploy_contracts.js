const JudoBeltStorage = artifacts.require("JudoBeltStorage");
const JudoUserRegistration = artifacts.require("JudoUserRegistration");
const JudoBeltPromotion = artifacts.require("JudoBeltPromotion");

module.exports = async function(deployer, network, accounts) {
    // Deploy the JudoBeltStorage contract first
    await deployer.deploy(JudoBeltStorage);
    const storageInstance = await JudoBeltStorage.deployed();

    // Deploy the JudoUserRegistration contract, linking to the storage
    await deployer.deploy(JudoUserRegistration, storageInstance.address);
    const userRegistrationInstance = await JudoUserRegistration.deployed();

    // Deploy the JudoBeltPromotion contract, linking to the storage
    await deployer.deploy(JudoBeltPromotion, storageInstance.address);
    const beltPromotionInstance = await JudoBeltPromotion.deployed();

    // Logging the addresses for reference
    console.log("Deployed addresses:");
    console.log(`JudoBeltStorage: ${storageInstance.address}`);
    console.log(`JudoUserRegistration: ${userRegistrationInstance.address}`);
    console.log(`JudoBeltPromotion: ${beltPromotionInstance.address}`);
};
