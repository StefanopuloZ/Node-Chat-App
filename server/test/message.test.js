const expect = require('expect');

const { generateMessage, generateLocationMessage } = require('../utils/message');

describe('generateMessage', () => {

    it('should generate correct message object', () => {
        let result = generateMessage('testUser', 'some test text');

        expect(result.from).toBe('testUser');
        expect(result.text).toBe('some test text');
        expect(typeof result.createdAt).toBe('number');
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location message', () => {
        let result = generateLocationMessage('Admin', '1', '2');

        expect(result.from).toBe('Admin');
        expect(result.url).toBe('https://www.google.com/maps?q=1.2');
        expect(typeof result.createdAt).toBe('number');
    });
})