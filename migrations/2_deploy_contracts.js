const JudoBeltSystem = artifacts.require("JudoBeltSystem");

module.exports = function (deployer) {
  // Replace the senseiWallets array with actual addresses of senseis (black belts)
  const senseiWallets = [
    "0x6bD300EcFc394Dd230f81B5D4e0D003416dcBAdF",
    "0x01555EEE2732C708BB8D628E44366Ff0Bb19CF33",
    // Add more sensei addresses if needed
  ];
  deployer.deploy(JudoBeltSystem, senseiWallets);
};
