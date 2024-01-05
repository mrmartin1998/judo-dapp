const JudoBeltStorage = artifacts.require("JudoBeltStorage");
const JudoUserRegistration = artifacts.require("JudoUserRegistration");
const JudoBeltPromotion = artifacts.require("JudoBeltPromotion");

module.exports = async function(deployer, network, accounts) {
    // Addresses of the initial senseis
    const initialSenseis = [
        "0x6bD300EcFc394Dd230f81B5D4e0D003416dcBAdF", // Replace with actual address
        "0x01555EEE2732C708BB8D628E44366Ff0Bb19CF33" // Replace with actual address
    ];

    // Deploy the JudoBeltStorage contract
    await deployer.deploy(JudoBeltStorage);
    const storageInstance = await JudoBeltStorage.deployed();

    // Initialize senseis
    await storageInstance.initializeSenseis(initialSenseis);

    // Deploy the JudoUserRegistration contract
    await deployer.deploy(JudoUserRegistration, storageInstance.address);
    const userRegistrationInstance = await JudoUserRegistration.deployed();

    // Deploy the JudoBeltPromotion contract
    await deployer.deploy(JudoBeltPromotion, storageInstance.address);
    const beltPromotionInstance = await JudoBeltPromotion.deployed();

    // Logging the addresses for reference
    console.log("Deployed addresses:");
    console.log(`JudoBeltStorage: ${storageInstance.address}`);
    console.log(`JudoUserRegistration: ${userRegistrationInstance.address}`);
    console.log(`JudoBeltPromotion: ${beltPromotionInstance.address}`);
};
