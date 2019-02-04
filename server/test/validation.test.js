const expect = require('expect');

const { isRealString } = require('../utils/isRealString');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        let testValue = isRealString(true);

        expect(testValue).toBeFalsy();
    });

    it('should reject string with only spaces', () => {
        let testValue = isRealString('    ');

        expect(testValue).toBeFalsy(); 
    });

    it('should allow string with non-space characters', () => {
        let testValue = isRealString('test room');

        expect(testValue).toBeTruthy(); 
    });
});