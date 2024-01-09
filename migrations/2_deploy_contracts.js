const JudoBeltStorage = artifacts.require("JudoBeltStorage");
const JudoUserRegistration = artifacts.require("JudoUserRegistration");
const JudoBeltPromotion = artifacts.require("JudoBeltPromotion");

module.exports = async function(deployer, network, accounts) {
    const initialBlackBelts = [
        "0x6bD300EcFc394Dd230f81B5D4e0D003416dcBAdF",  // Replace with actual black belt address
        "0x01555EEE2732C708BB8D628E44366Ff0Bb19CF33"   // Replace with actual black belt address
    ];

    await deployer.deploy(JudoBeltStorage, initialBlackBelts);
    const storageInstance = await JudoBeltStorage.deployed();

    await deployer.deploy(JudoUserRegistration, storageInstance.address);
    const userRegistrationInstance = await JudoUserRegistration.deployed();

    await deployer.deploy(JudoBeltPromotion, storageInstance.address);
    const beltPromotionInstance = await JudoBeltPromotion.deployed();

    console.log("Deployed addresses:");
    console.log(`JudoBeltStorage: ${storageInstance.address}`);
    console.log(`JudoUserRegistration: ${userRegistrationInstance.address}`);
    console.log(`JudoBeltPromotion: ${beltPromotionInstance.address}`);
};
