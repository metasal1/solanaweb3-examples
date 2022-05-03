import bs58 from 'bs58';


const bytes = Uint8Array.from([
    0, 60,  23, 110, 101, 155, 234,
   15, 41, 163, 233, 191, 120, 128,
  193, 18, 177, 179,  27,  77, 200,
   38, 38, 129, 135
])

const address = bs58.encode(bytes)
console.log(address)
// => 16UjcYNBG9GTK4uq2f7yYEbuifqCzoLMGS