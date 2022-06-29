import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { SolTransfer2 } from "../target/types/sol_transfer2";
import * as fs from 'fs';
import * as path from 'path';
import { publicKey } from "@project-serum/anchor/dist/cjs/utils";

describe("sol_transfer2", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());
  let provider = anchor.AnchorProvider.env();
  const program = anchor.workspace.SolTransfer2 as Program<SolTransfer2>;

  it("Sol Transfer", async () => {

    const sol_from = await provider.wallet
    const sol_to = await anchor.web3.Keypair.generate()

    await program.methods.solTransfer(new anchor.BN(1100000)).accounts({
      from: sol_from.publicKey,
      to: new anchor.web3.PublicKey("Bo5ENAzPyrNKwvL7go2V5jUprM1aebmjc48jjGfPEnyQ"), //? it's can be the sol_to value but for test purpose i use the concrit address.
      systemProgram: anchor.web3.SystemProgram.programId,
    }).rpc();

    // program.methods.
  });
});
