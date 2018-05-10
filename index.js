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

function hexByteToBinary(string) {
  return parseInt(string, 16).toString(2).padStart(8, '0');
}

function hexToBinary(string) {
  return string.match(/.{2}/g).map(hexByteToBinary).join('');
}

function byteToHex(byte) {
  return parseInt(byte, 2).toString(16).toUpperCase();
}

function byteArrayToHex (bytes) {
  return bytes.map(byte => {
    const hex = byteToHex(byte);
    return (hex.length < 2) ? `0${hex}` : hex;
  }).join('');
}

function base58FromHex(hex) {
  return bs58.encode(Buffer.from(hex, 'hex'));
}

function hexFromBase58(base58) {
  return bs58.decode(base58).toString('hex').toUpperCase();
}

module.exports = {
  generate20Bytes,
  hexByteToBinary,
  hexToBinary,
  byteToHex,
  byteArrayToHex,
  base58FromHex,
  hexFromBase58,
};
