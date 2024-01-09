const JudoBeltStorage = artifacts.require("JudoBeltStorage");
const JudoBeltPromotion = artifacts.require("JudoBeltPromotion");

contract("JudoBeltPromotion", () => {
    let judoBeltStorage, judoBeltPromotion;
    const blackBelt = "0x6bD300EcFc394Dd230f81B5D4e0D003416dcBAdF";
    const student = "0x0107712251358A29BFaDe8B5A8d734948c8644fb";

    before(async () => {
        judoBeltStorage = await JudoBeltStorage.deployed();
        judoBeltPromotion = await JudoBeltPromotion.deployed();

        // Ensure the student is registered and has a white belt
        await judoBeltStorage.setBeltLevel(student, 0, { from: blackBelt });
    });

    it("should allow a black belt to promote a student", async () => {
        await judoBeltPromotion.promoteJudoka(student, { from: blackBelt });
        const beltLevel = await judoBeltStorage.judokaBelts(student);
        assert.equal(beltLevel.toNumber(), 1, "Student should be promoted to yellow belt");
    });

    // Additional test cases...
});
