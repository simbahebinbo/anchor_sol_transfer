import * as anchor from "@coral-xyz/anchor";
import {SolTransfer} from "../target/types/sol_transfer";
import {assert} from "chai";

describe("sol_transfer", () => {
    // Configure the client to use the local cluster.
    let provider = anchor.AnchorProvider.env();
    anchor.setProvider(provider);
    const program = anchor.workspace.SolTransfer as anchor.Program<SolTransfer>;

    it("Sol Transfer", async () => {
        // Setup accounts
        const sol_from = provider.wallet;
        const sol_to = await anchor.web3.Keypair.generate();

        // Get initial balance of sol_to
        const initial_balance = await provider.connection.getBalance(sol_to.publicKey);

        // Transfer SOL
        const transfer_amount = new anchor.BN(1100000);
        await program.methods.transferSol(transfer_amount).accounts({
            from: sol_from.publicKey,
            to: sol_to.publicKey,
            systemProgram: anchor.web3.SystemProgram.programId,
        }).rpc();

        // Get final balance of sol_to
        const final_balance = await provider.connection.getBalance(sol_to.publicKey);

        // Check that the final balance is correct (initial_balance + transfer_amount)
        assert.equal(final_balance, initial_balance + transfer_amount.toNumber());

        console.log("Transfer successful! Balance updated correctly.");
    });
});
