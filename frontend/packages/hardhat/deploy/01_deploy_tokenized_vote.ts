import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployTokenizedVote: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer, ...others } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;
  await deploy("TokenizedVote", {
    from: deployer,
    log: true,
    autoMine: true,
  });
  console.log('deployer', deployer, others)

};

export default deployTokenizedVote;

deployTokenizedVote.tags = ["TokenizedVote"];