import * as dataStructions from './index';

const cars = [
	{ name: 'gol', category: 'popular', year: 2015 },
	{ name: 'civic', category: 'sedan', year: 2021 },
	{ name: 'renegade', category: 'suv', year: 2020 },
	{ name: 'golf', category: 'hatch', year: 2019 },
	{ name: 'corolla', category: 'sedan', year: 2021 },
];

describe('Testing data_structions util', () => {
	describe('arrayGroupBy', () => {
		it('should returns empty array when array is empty', () => {
			const grouped = dataStructions.arrayGroupBy([], 'category');
			expect(grouped).toHaveLength(0);
		});

		it.skip('should returns uncategorized when key is invalid', () => {
			const grouped = dataStructions.arrayGroupBy(cars, 'invalid_key');
			expect(grouped).toHaveLength(0);
		});

		it('should returns a grouped array by category', () => {
			const grouped = dataStructions.arrayGroupBy(cars, 'category');

			expect(grouped).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						title: 'sedan',
						data: [
							{ name: 'civic', category: 'sedan', year: 2021 },
							{ name: 'corolla', category: 'sedan', year: 2021 },
						],
					}),
				]),
			);
		});
	});

	describe('itemOfArrayByIndex', () => {
		it('should get an item from array when index exists', () => {
			const findItem = dataStructions.itemOfArrayByIndex(cars, 2);
			expect(findItem).toEqual(cars[2]);
		});

		it('should be able to returns undefined when index is invalid', () => {
			const findItem = dataStructions.itemOfArrayByIndex(cars, 20);
			expect(findItem).toBeUndefined();
		});
	});

	describe('filterArray', () => {
		it('should be able to filter items from array', () => {
			const filtered = dataStructions.filterArray(cars, 'name', 'gol');
			expect(filtered).toEqual(
				expect.arrayContaining([
					expect.objectContaining({ name: 'golf' }),
					expect.objectContaining({ name: 'gol' }),
				]),
			);
		});

		it('should be able to return an empty array when no items matched the search', () => {
			const filtered = dataStructions.filterArray(cars, 'name', 'invalid_car');
			expect(filtered).toHaveLength(0);
		});

		it('should be able to filter when key is different from string', () => {
			const filtered = dataStructions.filterArray(cars, 'year', '2021');
			expect(filtered).toEqual(
				expect.arrayContaining([
					expect.objectContaining({ name: 'civic', year: 2021 }),
					expect.objectContaining({ name: 'corolla', year: 2021 }),
				]),
			);
		});
	});

	describe('getValueOfObjectKey', () => {
		it('should get value from a valid object key', () => {
			const user = {
				name: 'Jon Doe',
				email: 'jon@doe.com',
				age: 24,
			};

			const value = dataStructions.getValueOfObjectKey(user, 'name');
			expect(value).toBe(user.name);
		});

		it('should not be able to get value when the key dont exists in the object', () => {
			const user = {
				name: 'Jon Doe',
				email: 'jon@doe.com',
				age: 24,
			};

			const value = dataStructions.getValueOfObjectKey(user, 'cpf');
			expect(value).toBeUndefined();
		});
	});

	describe('sortByKeyAlphabetically', () => {
		it('should be able do sort array by key', () => {
			const animals = [
				{ name: 'lion' },
				{ name: 'sheep' },
				{ name: 'bird' },
				{ name: 'elephant' },
			];

			const sorted = dataStructions.sortByKeyAlphabetically(animals, 'name');
			expect(sorted[0].name).toBe('bird');
			expect(sorted[3].name).toBe('sheep');
		});
	});

	describe('getRelevantObjectKeys', () => {
		it('should return empty object when key to keep dont exists in the original object', () => {
			const company = {
				name: 'Lorem Ipsun',
				cnpj: 12312312312312,
			};

			const relevant = dataStructions.getRelevantObjectKeys<any>(company, [
				'phone',
			]);

			expect(relevant).toStrictEqual({});
		});

		it('should return only existent keys when given valid keys and invalid keys', () => {
			const company = {
				name: 'Lorem Ipsun',
				cnpj: 12312312312312,
			};

			const relevant = dataStructions.getRelevantObjectKeys<any>(company, [
				'name',
				'phone',
			]);

			expect(relevant).toEqual({ name: 'Lorem Ipsun' });
		});

		it('should get only specific object keys', () => {
			const company = {
				name: 'Lorem Ipsun',
				cnpj: 12312312312312,
				official_name: 'Lorem Ipsum SA',
				phone: 4788727652,
			};

			const relevant = dataStructions.getRelevantObjectKeys(company, [
				'name',
				'phone',
			]);

			expect(relevant).toEqual({ name: 'Lorem Ipsun', phone: 4788727652 });
		});
	});

	describe('removeEmptyKeysFromObject', () => {
		it('should remove undefined and null object keys', () => {
			const company = {
				name: 'Lorem Ipsun',
				official_name: 'Lorem Ipsum SA',
				cnpj: null,
				phone: undefined,
			};

			const result = dataStructions.removeEmptyKeysFromObject(company);
			expect(result).toEqual({
				name: 'Lorem Ipsun',
				official_name: 'Lorem Ipsum SA',
			});
		});
	});
});
