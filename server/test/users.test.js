const expect = require('expect');

const { Users } = require('../utils/users');

describe('User', () => {

    let users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: 1,
            name: 'Jen',
            room: 'A-room'
        }, {
            id: 2,
            name: 'Benet',
            room: 'B-room'
        }, {
            id: 3,
            name: 'Steven',
            room: 'A-room'
        }];
    });

    it('should add new user', () => {
        let user = [4, 'John', 'C-room']
        users.addUser(...user);

        expect(users.users[3]).toEqual({ id: 4, name: 'John', room: 'C-room' });
    });

    it('should remove a user', () => {
        users.removeUser(1);

        expect(users.users.length).toBe(2);
    });

    it('should not remove user', () => {
        users.removeUser(11);

        expect(users.users.length).toBe(3);
    });

    it('should find user', () => {
        let user = users.getUser(1);

        expect(user).toEqual({
            id: 1,
            name: 'Jen',
            room: 'A-room'
        });
    });

    it('should return user names for A-room', () => {
        let names = users.getUserList('A-room');

        expect(names).toEqual(['Jen', 'Steven']);
    });

});