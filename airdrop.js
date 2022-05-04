import { Keypair, Connection, clusterApiUrl, LAMPORTS_PER_SOL, Transaction, TransactionInstruction, SystemProgram, sendAndConfirmTransaction } from "@solana/web3.js";
import fs from 'fs'
let paySecret = fs.readFileSync('devkey-pay.json');
let payJSON = JSON.parse(paySecret);
let keypair = Keypair.fromSecretKey(Uint8Array.from(payJSON))

let connection = new Connection(clusterApiUrl('devnet'));

console.log('pubkey =', keypair.publicKey.toBase58())

const airdropSignature = await connection.requestAirdrop(
    keypair.publicKey,
    LAMPORTS_PER_SOL,
);

let result = await connection.confirmTransaction(airdropSignature);

console.log(result)