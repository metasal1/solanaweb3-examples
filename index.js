import * as solana from '@solana/web3.js';

import bs58 from 'bs58';

var kp = solana.Keypair.generate();

console.log(kp)
var pkBytes = kp._keypair.publicKey
var skBytes = kp._keypair.secretKey.slice(0,32)
var ikBytes = kp._keypair.secretKey


const pk = bs58.encode(pkBytes)
const sk = bs58.encode(skBytes)
const ik = bs58.encode(ikBytes)

console.log('Public key = ',pk)
console.log('Secret key = ',sk)
console.log('Import key = ',ik)

let kp2 = solana.Keypair.fromSecretKey(ikBytes);

console.log(kp2)