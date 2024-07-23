const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RewardToken", function () {
  let RewardToken, rewardToken;
  let owner, addr1, addr2;

  beforeEach(async function () {
    // Get the contract factory
    RewardToken = await ethers.getContractFactory("RewardToken");

    // Get signers (accounts)
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy the contract
    rewardToken = await RewardToken.deploy();
    await rewardToken.deployed();
  });

  it("Should have correct name and symbol", async function () {
    expect(await rewardToken.name()).to.equal("RewardToken");
    expect(await rewardToken.symbol()).to.equal("RTK");
  });

  it("Should mint tokens correctly", async function () {
    // Mint 100 tokens to addr1
    await rewardToken.mint(addr1.address, ethers.utils.parseEther("100"));
    const addr1Balance = await rewardToken.balanceOf(addr1.address);
    expect(ethers.utils.formatEther(addr1Balance)).to.equal("100.0");

    // Mint 50 tokens to addr2
    await rewardToken.mint(addr2.address, ethers.utils.parseEther("50"));
    const addr2Balance = await rewardToken.balanceOf(addr2.address);
    expect(ethers.utils.formatEther(addr2Balance)).to.equal("50.0");
  });

  it("Should only allow owner to mint tokens", async function () {
    // addr1 tries to mint tokens (should fail)
    await expect(
      rewardToken.connect(addr1).mint(addr1.address, ethers.utils.parseEther("100"))
    ).to.be.revertedWith("Ownable: caller is not the owner");

    // Owner mints tokens (should succeed)
    await rewardToken.mint(addr1.address, ethers.utils.parseEther("100"));
    const addr1Balance = await rewardToken.balanceOf(addr1.address);
    expect(ethers.utils.formatEther(addr1Balance)).to.equal("100.0");
  });

  it("Should transfer tokens correctly", async function () {
    // Mint 100 tokens to owner
    await rewardToken.mint(owner.address, ethers.utils.parseEther("100"));

    // Transfer 50 tokens from owner to addr1
    await rewardToken.transfer(addr1.address, ethers.utils.parseEther("50"));
    const addr1Balance = await rewardToken.balanceOf(addr1.address);
    expect(ethers.utils.formatEther(addr1Balance)).to.equal("50.0");

    const ownerBalance = await rewardToken.balanceOf(owner.address);
    expect(ethers.utils.formatEther(ownerBalance)).to.equal("50.0");
  });
});