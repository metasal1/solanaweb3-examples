import { struct, u32, ns64 } from "@solana/buffer-layout";
import { Buffer } from 'buffer';
import { Keypair, Connection, clusterApiUrl, LAMPORTS_PER_SOL, Transaction, TransactionInstruction, SystemProgram, sendAndConfirmTransaction } from "@solana/web3.js";
import bs58 from 'bs58';
import fs from 'fs';


let paySecret = fs.readFileSync('devkey-pay.json');
let payJSON = JSON.parse(paySecret);
let payer = Keypair.fromSecretKey(Uint8Array.from(payJSON))

console.log('payer',payer.publicKey.toBase58())

let connection = new Connection(clusterApiUrl('devnet'));

let res = await connection.getAccountInfoAndContext(
  payer.publicKey
);
console.log(JSON.stringify(res))
