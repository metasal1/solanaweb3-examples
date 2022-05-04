import { struct, u32, ns64 } from "@solana/buffer-layout";
import { Buffer } from 'buffer';
import { Keypair, Connection, clusterApiUrl, LAMPORTS_PER_SOL, Transaction, TransactionInstruction, SystemProgram, sendAndConfirmTransaction } from "@solana/web3.js";
import bs58 from 'bs58';
import fs from 'fs';


let paySecret = fs.readFileSync('devkey-pay.json');
let recSecret = fs.readFileSync('devkey-rec.json');
let payerJSON = JSON.parse(paySecret);
let recJSON = JSON.parse(recSecret);

let payer = Keypair.fromSecretKey(Uint8Array.from(payerJSON))
let rec = Keypair.fromSecretKey(Uint8Array.from(recJSON))

console.log('payer',payer.publicKey.toBase58())
console.log('rec',rec.publicKey.toBase58())

let connection = new Connection(clusterApiUrl('devnet'));

let airdropSignature = await connection.requestAirdrop(
  payer.publicKey,
  LAMPORTS_PER_SOL,
);

console.log('airdrop', airdropSignature)

let bal = await connection.getBalance(
  payer.publicKey
);
console.log('balance', bal)

let allocateTransaction = new Transaction({
  feePayer: payer.publicKey
});

let keys = [{pubkey: rec.publicKey, isSigner: true, isWritable: true}];
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

let tx = await sendAndConfirmTransaction(connection, allocateTransaction, [payer, rec]);

console.log('transaction', tx)

let balAfter = await connection.getBalance(
  payer.publicKey
);
console.log('balance', balAfter)
