const bs58 = require('bs58');
const {
  generate20Bytes,
  hexByteToBinary,
  hexToBinary,
  byteToHex,
  byteArrayToHex,
  base58FromHex,
  hexFromBase58,
} = require('.');

const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
const binary = ['0000', '0001', '0010', '0011', '0100', '0101', '0110', '0111', '1000', '1001', '1010', '1011', '1100', '1101', '1110', '1111'];

describe('generate20Bytes', () => {
  test('should return array with length 20', () => {
    expect(generate20Bytes().length).toEqual(20);
    expect(generate20Bytes().reduce((acc, next) => (acc === false) ? acc : next.length === 8, true)).toEqual(true);
  });
});

describe('hexByteToBinary', () => {
  test('should convert a hex string to binary', () => {
    for (let count = 0; count < hex.length; count++) {
      expect(hexByteToBinary(hex[count].toString(16))).toEqual(`0000${binary[count]}`);
    }
  });
});

describe('byteToHex', () => {
  test('should convert a byte string to hex char', () => {
    for (let count = 0; count < hex.length; count++) {
      expect(byteToHex(binary[count])).toEqual(hex[count].toString());
    }
  });
});

describe('hexToBinary', () => {
  test('should convert hex to binary', () => {
    expect(hexToBinary(`${hex[15]}${hex[14]}${hex[13]}${hex[12]}`))
      .toEqual(`${binary[15]}${binary[14]}${binary[13]}${binary[12]}`);
  });
});

describe('byteArrayToHex', () => {
  test('should convert a byte string to hex char', () => {
    expect(byteArrayToHex([`${binary[15]}${binary[14]}`, `${binary[13]}${binary[12]}`]))
      .toEqual(`${hex[15]}${hex[14]}${hex[13]}${hex[12]}`);
  });

  test('should handle leading zeros', () => {
    expect(byteArrayToHex([`${binary[0]}${binary[14]}`, `${binary[1]}${binary[12]}`]))
      .toEqual(`${hex[0]}${hex[14]}${hex[1]}${hex[12]}`);
  });

});

describe('base58FromHex', () => {
  test('should convert a hex string to base 58', () => {
    expect(base58FromHex(`${hex[15]}${hex[14]}${hex[13]}${hex[12]}`))
      .toEqual(bs58.encode(Buffer.from(`${hex[15]}${hex[14]}${hex[13]}${hex[12]}`, 'hex')));
  });
});

describe('hexFromBase58', () => {
  test('should convert a hex string to base 58', () => {
    const hexString = `${hex[15]}${hex[14]}${hex[13]}${hex[12]}`;
    const base58String = bs58.encode(Buffer.from(hexString, 'hex'));
    expect(hexFromBase58(base58String)).toEqual(hexString);
  });
});

describe('end to end', () => {
  test('should generate 20 bytes, convert to hex, convert to base58 and back', () => {
    const bytes = generate20Bytes();
    const hexString = byteArrayToHex(bytes);
    const base58String = base58FromHex(hexString);
    const base58StringConverted = hexFromBase58(base58String);
    const binaryString = hexToBinary(base58StringConverted);
    expect(hexToBinary(hexString).toString()).toEqual(bytes.join(''));    
    expect(base58StringConverted).toEqual(hexString);
    expect(binaryString).toEqual(bytes.join(''));
  });
});
