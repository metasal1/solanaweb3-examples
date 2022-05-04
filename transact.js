import { struct, u32, ns64 } from "@solana/buffer-layout";
import { Buffer } from 'buffer';
import { Keypair, Connection, clusterApiUrl, LAMPORTS_PER_SOL, Transaction, TransactionInstruction, SystemProgram, sendAndConfirmTransaction } from "@solana/web3.js";
import bs58 from 'bs58';

let keypair = Keypair.generate();
let payer = Keypair.generate();

console.log('receiver',bs58.encode(keypair._keypair.publicKey))
console.log('payer',bs58.encode(payer._keypair.publicKey))
let connection = new Connection(clusterApiUrl('devnet'));

let airdropSignature = await connection.requestAirdrop(
  payer.publicKey,
  LAMPORTS_PER_SOL,
);

console.log('airdrop sign', airdropSignature)
await connection.confirmTransaction(airdropSignature);

let allocateTransaction = new Transaction({
  feePayer: payer.publicKey
});

let keys = [{pubkey: keypair.publicKey, isSigner: true, isWritable: true}];
let params = { space: 100 };

let allocateStruct = {
  index: 8,
  layout: struct([
    u32('instruction'),
    ns64('space'),
  ])
};

let data = Buffer.alloc(allocateStruct.layout.span);
let layoutFields = Object.assign({instruction: allocateStruct.index}, params);
allocateStruct.layout.encode(layoutFields, data);

allocateTransaction.add(new TransactionInstruction({
  keys,
  programId: SystemProgram.programId,
  data,
}));

let tx = await sendAndConfirmTransaction(connection, allocateTransaction, [payer, keypair]);

console.log('transaction', tx)