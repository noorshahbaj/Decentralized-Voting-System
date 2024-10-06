const Voting = artifacts.require("Voting");

contract("Voting", (accounts) => {
  let votingInstance;

  beforeEach(async () => {
    votingInstance = await Voting.new();
  });

  it("Checking JWT Authorization", async () => {
    const candidateName = "John Doe";
    const candidateParty = "Democratic";
    const tx = await votingInstance.addCandidate(candidateName, candidateParty);
    assert.ok(tx.receipt.status);
    const candidateID = await votingInstance.getCountCandidates();
    assert.equal(candidateID, 1);
  });

  it("Verify user login", async () => {
    const candidateName = "John Doe";
    const candidateParty = "Democratic";
    await votingInstance.addCandidate(candidateName, candidateParty);
    try {
      await votingInstance.vote(1);
      assert.fail("Should have thrown an error");
    } catch (error) {
      assert.ok(error.message.includes("revert"));
    }
  });

  it("Verify candidate registration", async () => {
    try {
      await votingInstance.vote(2);
      assert.fail("Should have thrown an error");
    } catch (error) {
      assert.ok(error.message.includes("revert"));
    }
  });

  it("Verify date registration", async () => {
    const candidateName1 = "John Doe";
    const candidateParty1 = "Democratic";
    const candidateName2 = "Jane Doe";
    const candidateParty2 = "Republican";
    await votingInstance.addCandidate(candidateName1, candidateParty1);
    await votingInstance.addCandidate(candidateName2, candidateParty2);
    const candidateCount = await votingInstance.getCountCandidates();
    assert.equal(candidateCount, 2);
  });
});
