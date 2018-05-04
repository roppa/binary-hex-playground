const bs58 = require('bs58');

function generate20Bytes () {
  let byteArray = [];
  let bytes = 0;
  while (bytes < 20) {
    let byte = '';
    while (byte.length < 8) {
      byte += Math.floor(Math.random() * 2);
    }
    byteArray.push(byte);
    bytes++;
  }
  return byteArray;
}

function hexStringToBinary (string) {
  return string.split('')
    .map(hex => parseInt(hex, 16).toString(2).padStart(4, '0'));
}

const addressArray = generate20Bytes();
const binaryAddress = addressArray.join('');
const hex = addressArray.map(byte => parseInt(byte, 2).toString(16)).join('');
console.log('= hex ==============================================');
console.log(hex);

// then lets convert it to base 58
const base58 = bs58.encode(Buffer.from(hex));
console.log('= base 58 ==============================================');
console.log(base58);

// lets see if we can reverse the process
const destructuredHex = bs58.decode(base58).toString();
console.log('= hex should be the same ==============================================');
console.log(hex === destructuredHex);

// lets convert back to a binary string
const destructuredAddress = hexStringToBinary(destructuredHex).join('');
console.log('= destructured address ==============================================');
console.log(destructuredAddress);
console.log('= binaryAddress address ==============================================');
console.log(binaryAddress);

console.log(destructuredAddress === binaryAddress);
