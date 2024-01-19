const JudoBeltStorage = artifacts.require("JudoBeltStorage");
const JudokaRegistration = artifacts.require("JudokaRegistration");
const BeltPromotionManagement = artifacts.require("BeltPromotionManagement");

contract("Judo DApp Tests", accounts => {
    let beltStorage, judokaRegistration, beltPromotion;
    const admin = accounts[0]; // Admin is also black belt 1
    const blackBelt1 = "0x6bD300EcFc394Dd230f81B5D4e0D003416dcBAdF";
    const blackBelt2 = "0x01555EEE2732C708BB8D628E44366Ff0Bb19CF33";
    const student1 = accounts[3]; // Replace with actual student addresses if needed
    const student2 = accounts[4];
    const nonBlackBelt = accounts[5]; // Address not registered as black belt

    before(async () => {
        beltStorage = await JudoBeltStorage.new({ from: admin });
        judokaRegistration = await JudokaRegistration.new(beltStorage.address, { from: admin });
        beltPromotion = await BeltPromotionManagement.new(beltStorage.address, { from: admin });

        // Setting the registration contract address in the beltStorage
        await beltStorage.setRegistrationContract(judokaRegistration.address, { from: admin });
    });

    it("should allow a black belt to register a new user", async () => {
        await judokaRegistration.registerJudoka("Student One", student1, { from: blackBelt1 });
        const studentInfo = await beltStorage.getJudoka(student1);
        assert.equal(studentInfo.beltLevel, 0, "Student should be registered with a white belt");
    });

    it("should allow a student to request a promotion", async () => {
        await beltStorage.requestPromotion(student1, 1, { from: student1 }); // Request yellow belt
        const studentInfo = await beltStorage.getJudoka(student1);
        assert.equal(studentInfo.requestedLevel, 1, "Student should have requested yellow belt");
    });

    it("should allow a black belt to approve a promotion", async () => {
        await beltPromotion.approvePromotion(student1, { from: blackBelt2 });
        const studentInfo = await beltStorage.getJudoka(student1);
        assert.equal(studentInfo.beltLevel, 1, "Student should be promoted to yellow belt");
    });

    it("should not allow a non-black belt to approve a promotion", async () => {
        try {
            await beltPromotion.approvePromotion(student2, { from: nonBlackBelt });
            assert.fail("Non-black belt should not be able to approve a promotion");
        } catch (error) {
            assert.include(error.message, "revert", "Expected revert for unauthorized approval");
        }
    });

    it("should allow viewing a judoka's belt level", async () => {
        const studentInfo = await beltStorage.getJudoka(student1);
        assert.equal(studentInfo.beltLevel, 1, "Should return the correct belt level");
    });

    // Add more test cases as per requirements
});
