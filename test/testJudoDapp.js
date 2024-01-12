const JudoBeltStorage = artifacts.require("JudoBeltStorage");
const JudoUserRegistration = artifacts.require("JudoUserRegistration");
const JudoBeltPromotion = artifacts.require("JudoBeltPromotion");

contract("Judo DApp Tests", accounts => {
    let beltStorage, userRegistration, beltPromotion;
    const blackBelt1 = "0x6bD300EcFc394Dd230f81B5D4e0D003416dcBAdF";
    const blackBelt2 = "0x01555EEE2732C708BB8D628E44366Ff0Bb19CF33";
    const student1 = "0x0107712251358A29BFaDe8B5A8d734948c8644fb";
    const student2 = "0x170BB3e3c35Cd3F1bd14087ea4567c92d0F73D9C";

    before(async () => {
        beltStorage = await JudoBeltStorage.deployed();
        userRegistration = await JudoUserRegistration.deployed(beltStorage.address);
        beltPromotion = await JudoBeltPromotion.deployed(beltStorage.address);

        // Set contract addresses in JudoBeltStorage
        await beltStorage.setContractAddresses(userRegistration.address, beltPromotion.address);
    });

    it("should allow a black belt to register a new user", async () => {
        await userRegistration.registerUser(student1, { from: blackBelt1 });
        const belt = await beltStorage.getBeltLevel(student1);
        assert.equal(belt.toNumber(), 0, "Student should be registered with a white belt");
    });

    it("should allow a black belt to promote a student", async () => {
        await beltPromotion.promoteJudoka(student2, { from: blackBelt2 });
        const belt = await beltStorage.getBeltLevel(student2);
        assert.equal(belt.toNumber(), 1, "Student should be promoted to yellow belt");
    });

    it("should allow viewing a judoka's belt level", async () => {
        const belt = await beltStorage.getBeltLevel(student1);
        assert.equal(belt.toNumber(), 0, "Should return the correct belt level");
    });

    it("should not allow a non-black belt to promote a student", async () => {
        try {
            await beltPromotion.promoteJudoka(student1, { from: student2 });
            assert.fail("Non-black belt should not be able to promote");
        } catch (error) {
            assert.include(error.message, "revert", "Expected revert for unauthorized promotion");
        }
    });

    // Additional tests can be added as required
});
