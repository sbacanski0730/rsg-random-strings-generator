import Database from '../../components/Database';

describe('Testing Database', () => {
	describe('Proper database connecting', () => {
		it('should not throw error', () => {
			expect(Database.connect).not.toThrow();
		});

		it('should be just one instance of database', () => {
			expect(Database.connect()).toStrictEqual(Database.connect());
		});
	});
});
