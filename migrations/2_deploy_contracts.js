const JudoBeltSystem = artifacts.require("JudoBeltSystem");

module.exports = function (deployer) {
  // Replace the senseiWallets array with actual addresses of senseis (black belts)
  const senseiWallets = [
    "0xca75E8Eae6fD94862541f01B2A67Ac0B8A01431b",
    "0x38F756cA27c0CaF09Ee39879771616e964cd9358",
    // Add more sensei addresses if needed
  ];
  deployer.deploy(JudoBeltSystem, senseiWallets);
};
