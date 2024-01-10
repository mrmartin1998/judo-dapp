const { deployProxy } = require('@openzeppelin/truffle-upgrades');

const JudoBeltStorage = artifacts.require("JudoBeltStorage");
const JudoUserRegistration = artifacts.require("JudoUserRegistration");
const JudoBeltPromotion = artifacts.require("JudoBeltPromotion");

module.exports = async function(deployer) {
    const initialBlackBelts = ["0x6bD300EcFc394Dd230f81B5D4e0D003416dcBAdF", "0x01555EEE2732C708BB8D628E44366Ff0Bb19CF33"];

    // Deploy JudoBeltStorage with a proxy
    const storageInstance = await deployProxy(JudoBeltStorage, [initialBlackBelts], { deployer, initializer: 'initialize' });

    // Deploy other contracts with storageInstance.address
    await deployer.deploy(JudoUserRegistration, storageInstance.address);
    await deployer.deploy(JudoBeltPromotion, storageInstance.address);

    // Output deployed addresses
    console.log("Deployed addresses:");
    console.log(`JudoBeltStorage: ${storageInstance.address}`);
    console.log(`JudoUserRegistration: ${JudoUserRegistration.address}`);
    console.log(`JudoBeltPromotion: ${JudoBeltPromotion.address}`);
};
