import * as solana from '@solana/web3.js';

import bs58 from 'bs58';

var kp = solana.Keypair.generate();

var pkBytes = kp._keypair.publicKey
var skBytes = kp._keypair.secretKey

const pk = bs58.encode(pkBytes)
const sk = bs58.encode(skBytes)
console.log(pk)
console.log(sk)