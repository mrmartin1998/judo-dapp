const JudoBeltStorage = artifacts.require("JudoBeltStorage");

contract("JudoBeltStorage", () => {
    let judoBeltStorage;
    const blackBelt1 = "0x6bD300EcFc394Dd230f81B5D4e0D003416dcBAdF";
    const blackBelt2 = "0x01555EEE2732C708BB8D628E44366Ff0Bb19CF33";

    before(async () => {
        judoBeltStorage = await JudoBeltStorage.deployed();
    });

    it("should initialize black belts correctly", async () => {
        const beltLevel1 = await judoBeltStorage.judokaBelts(blackBelt1);
        const beltLevel2 = await judoBeltStorage.judokaBelts(blackBelt2);
        assert.equal(beltLevel1.toNumber(), 6, "First black belt not initialized correctly");
        assert.equal(beltLevel2.toNumber(), 6, "Second black belt not initialized correctly");
    });

    // Additional test cases...
});
