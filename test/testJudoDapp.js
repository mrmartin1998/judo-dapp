const JudoBeltStorage = artifacts.require("JudoBeltStorage");
const JudoUserRegistration = artifacts.require("JudoUserRegistration");
const JudoBeltPromotion = artifacts.require("JudoBeltPromotion");

contract("Judo DApp Test", async accounts => {
    let storage, userReg, beltPromotion;

    const blackBelt1 = "0x6bD300EcFc394Dd230f81B5D4e0D003416dcBAdF";
    const blackBelt2 = "0x01555EEE2732C708BB8D628E44366Ff0Bb19CF33";
    const student1 = "0x0107712251358A29BFaDe8B5A8d734948c8644fb";
    const student2 = "0x170BB3e3c35Cd3F1bd14087ea4567c92d0F73D9C";

    before(async () => {
        storage = await JudoBeltStorage.deployed();
        userReg = await JudoUserRegistration.deployed();
        beltPromotion = await JudoBeltPromotion.deployed();
    });

    it("should have initialized black belts correctly", async () => {
        const belt1 = await storage.getBeltLevel(blackBelt1);
        const belt2 = await storage.getBeltLevel(blackBelt2);
        assert.equal(belt1.toNumber(), 6, "First black belt should be initialized as Black");
        assert.equal(belt2.toNumber(), 6, "Second black belt should be initialized as Black");
    });

    it("should allow a black belt to register a new user", async () => {
        await userReg.registerUser(student1, 0, { from: blackBelt1 });
        const belt = await storage.getBeltLevel(student1);
        assert.equal(belt.toNumber(), 0, "Student should be registered with a white belt");
    });

    it("should allow a black belt to promote a student", async () => {
        await beltPromotion.promoteJudoka(student2, { from: blackBelt2 });
        const belt = await storage.getBeltLevel(student2);
        assert.equal(belt.toNumber(), 1, "Student should be promoted to yellow belt");
    });
});
