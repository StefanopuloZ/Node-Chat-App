const expect = require('expect');

const { generateMessage } = require('../utils/message');

describe('generateMessage', () => {

    it('should generate correct message object', () => {
        let result = generateMessage('testUser', 'some test text');

        expect(result.from).toBe('testUser');
        expect(result.text).toBe('some test text');
        expect(typeof result.createdAt).toBe('number');
    });
});