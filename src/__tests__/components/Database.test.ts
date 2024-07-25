import Database from '../../components/Database';

describe('Testing Database', () => {
	// TODO: create database mock
	describe('Proper database connecting', () => {
		it('should not throw error', () => {
			expect(Database.connect).not.toThrow();
		});

		it('should be just one instance of database', () => {
			expect(Database.connect()).toStrictEqual(Database.connect());
		});
	});
	// description: "Proper database actions - set, get"
	// it "should set value with provided string as a key"
	// it "should return the same generated string as it got"
	// it "should delete key after return"
});
