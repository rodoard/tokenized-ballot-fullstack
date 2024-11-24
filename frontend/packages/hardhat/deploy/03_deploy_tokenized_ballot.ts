import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { stringToHex } from "viem";
import path from "path"

const  proposalType = "Thanksgiving Cake"
 const proposalNames = [
    "Chocolate", "Pumpkin", "Carrot"
].map(name => stringToHex(name, {size: 32}))

const deployTokenizedBallot: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;
  const tokenizedVote = await import(path.join(path.dirname(__dirname),"deployments/sepolia/TokenizedVote.json")) 
  await deploy("TokenizedBallot", {
    from: deployer,
    log: true,
    autoMine: true,
    args: [
      proposalType,
      proposalNames,
      tokenizedVote.address
    ]
  });

};

export default deployTokenizedBallot;

deployTokenizedBallot.tags = ["TokenizedBallot"];