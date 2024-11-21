import { ethers } from "hardhat";

async function main() {
  const WasteToken = await ethers.getContractFactory("WasteToken");
  const wasteToken = await WasteToken.deploy();
  await wasteToken.waitForDeployment();

  console.log(`WasteToken deployed to ${await wasteToken.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
