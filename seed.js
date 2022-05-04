import { Keypair } from "@solana/web3.js";
import * as bip39 from "bip39";
import base58 from "bs58";

(async () => {
  const password = '';
  const mnemonic = bip39.generateMnemonic();
//   console.log(mnemonic)
  const seed = bip39.mnemonicToSeedSync(mnemonic, password);
  console.log(seed)
  const keypair = Keypair.fromSeed(seed.slice(0, 32));
  
//   console.log(`${keypair.publicKey.toBase58()}`); 
  const importKey = base58.encode(keypair.secretKey)
    // console.log('importkey', importKey)
})();

