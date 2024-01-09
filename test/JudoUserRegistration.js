const JudoBeltStorage = artifacts.require("JudoBeltStorage");
const JudoUserRegistration = artifacts.require("JudoUserRegistration");

contract("JudoUserRegistration", () => {
    let judoBeltStorage, judoUserRegistration;
    const blackBelt = "0x6bD300EcFc394Dd230f81B5D4e0D003416dcBAdF";
    const regularUser = "0x0107712251358A29BFaDe8B5A8d734948c8644fb";

    before(async () => {
        judoBeltStorage = await JudoBeltStorage.deployed();
        judoUserRegistration = await JudoUserRegistration.deployed();
    });

    it("should allow a black belt to register a new user", async () => {
        await judoUserRegistration.registerUser(regularUser, 0, { from: blackBelt });
        const beltLevel = await judoBeltStorage.judokaBelts(regularUser);
        assert.equal(beltLevel.toNumber(), 0, "User should be registered with a white belt");
    });

    // Additional test cases...
});
